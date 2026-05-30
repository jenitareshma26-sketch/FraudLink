import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Layout from '../components/Layout';
import type { } from '../types';
import { mockScamNetworks } from '../data/mockData';
import { X } from 'lucide-react';

const ScamNetworkVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const network = mockScamNetworks[0];

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight - 60;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#0A0F1E');

    // Create a group for zooming
    const g = svg.append('g');

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    // Create force simulation
    const simulation = d3.forceSimulation(network.nodes as any)
      .force('link', d3.forceLink(network.edges as any)
        .id((d: any) => d.id)
        .distance(100)
        .strength(0.5))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(50));

    // Create links (edges)
    const links = g.append('g')
      .selectAll('line')
      .data(network.edges)
      .enter()
      .append('line')
      .attr('stroke', '#1A2332')
      .attr('stroke-width', (d: any) => d.weight * 2)
      .attr('opacity', 0.6)
      .attr('class', 'edge');

    // Add edge labels
    const edgeLabels = g.append('g')
      .selectAll('text')
      .data(network.edges)
      .enter()
      .append('text')
      .attr('font-size', '10px')
      .attr('fill', '#8892A4')
      .attr('text-anchor', 'middle')
      .attr('dy', '-5px')
      .text((d: any) => d.label);

    // Create nodes
    const nodes = g.append('g')
      .selectAll('circle')
      .data(network.nodes)
      .enter()
      .append('circle')
      .attr('r', (d: any) => {
        switch (d.type) {
          case 'user':
            return 30;
          case 'device':
            return 25;
          case 'ip_address':
            return 20;
          case 'account':
            return 22;
          case 'transaction':
            return 15;
          default:
            return 20;
        }
      })
      .attr('fill', (d: any) => d.color || '#00D4FF')
      .attr('stroke', '#00D4FF')
      .attr('stroke-width', 2)
      .attr('opacity', 0.9)
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .on('click', (_event, d: any) => {
        _event.stopPropagation();
        setSelectedNode(d);
      })
      .on('mouseover', function (_event: any, d: any) {
        d3.select(this)
          .attr('stroke-width', 3)
          .attr('r', (d: any) => {
            const baseRadius = d.type === 'user' ? 30 : d.type === 'device' ? 25 : d.type === 'ip_address' ? 20 : d.type === 'account' ? 22 : 15;
            return baseRadius + 5;
          });

        // Highlight connected edges
        links.attr('stroke', (edge: any) => {
          if (edge.source.id === d.id || edge.target.id === d.id) {
            return '#00D4FF';
          }
          return '#1A2332';
        }).attr('stroke-width', (edge: any) => {
          if (edge.source.id === d.id || edge.target.id === d.id) {
            return (edge.weight * 3);
          }
          return edge.weight * 2;
        });
      })
      .on('mouseout', function (_event: any, _d: any) {
        d3.select(this)
          .attr('stroke-width', 2)
          .attr('r', (d: any) => {
            switch (d.type) {
              case 'user':
                return 30;
              case 'device':
                return 25;
              case 'ip_address':
                return 20;
              case 'account':
                return 22;
              case 'transaction':
                return 15;
              default:
                return 20;
            }
          });

        // Reset edges
        links.attr('stroke', '#1A2332').attr('stroke-width', (d: any) => d.weight * 2);
      })
      .call(d3.drag<any, any>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (_event) => {
          if (!_event.active) simulation.alphaTarget(0);
        }));

    // Add node labels
    const labels = g.append('g')
      .selectAll('text')
      .data(network.nodes)
      .enter()
      .append('text')
      .attr('font-size', '11px')
      .attr('fill', '#ffffff')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('pointer-events', 'none')
      .text((d: any) => {
        const label = d.label || d.id;
        return label.length > 15 ? label.substring(0, 12) + '...' : label;
      });

    // Add legend
    const legendData = [
      { type: 'user', label: 'Users', color: '#3B82F6' },
      { type: 'device', label: 'Devices', color: '#C75DFF' },
      { type: 'ip_address', label: 'IP Addresses', color: '#FFB500' },
      { type: 'account', label: 'Accounts', color: '#FFD700' },
      { type: 'transaction', label: 'Transactions', color: '#FF6B6B' },
    ];

    const legend = g.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 150}, 20)`);

    legendData.forEach((item, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`);

      legendItem.append('circle')
        .attr('r', 6)
        .attr('fill', item.color)
        .attr('stroke', item.color)
        .attr('stroke-width', 1);

      legendItem.append('text')
        .attr('x', 15)
        .attr('y', 4)
        .attr('font-size', '12px')
        .attr('fill', '#8892A4')
        .text(item.label);
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      links
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      edgeLabels
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

      nodes
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labels
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    // Close details on background click
    svg.on('click', () => {
      setSelectedNode(null);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <Layout>
      <div className='space-y-4'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-white'>Scam Network Visualization</h1>
          <p className='text-text-secondary mt-2'>Interactive graph showing relationships between fraudsters, devices, and accounts</p>
        </div>

        {/* Controls */}
        <div className='glass-card p-4 rounded-lg flex items-center justify-between'>
          <div>
            <p className='text-sm text-text-secondary'>
              Network: <span className='text-cyan-accent font-semibold'>{network.name}</span>
            </p>
            <p className='text-sm text-text-secondary mt-1'>
              {network.nodes.length} nodes • {network.edges.length} connections • Severity: <span className='badge-danger'>{network.severity}</span>
            </p>
          </div>
          <div className='text-sm text-text-secondary'>
            Zoom: {(zoomLevel * 100).toFixed(0)}%
          </div>
        </div>

        {/* Graph Container */}
        <div
          ref={containerRef}
          className='glass-card rounded-lg overflow-hidden border border-cyan-accent/30 shadow-glow-cyan'
          style={{ height: '600px' }}
        >
          <svg ref={svgRef} />
        </div>

        {/* Node Details Panel */}
        {selectedNode && (
          <div className='glass-card p-6 rounded-lg border border-cyan-accent/30'>
            <div className='flex items-start justify-between mb-4'>
              <div>
                <h3 className='text-xl font-bold text-white'>{selectedNode.label}</h3>
                <p className='text-text-secondary text-sm capitalize mt-1'>{selectedNode.type.replace('_', ' ')}</p>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className='p-2 hover:bg-dark-bg/50 rounded-lg transition-colors'
              >
                <X size={20} className='text-text-secondary' />
              </button>
            </div>

            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              <div className='bg-dark-bg/50 p-3 rounded-lg'>
                <p className='text-text-secondary text-xs mb-1'>ID</p>
                <p className='text-white font-mono text-sm'>{selectedNode.id}</p>
              </div>
              <div className='bg-dark-bg/50 p-3 rounded-lg'>
                <p className='text-text-secondary text-xs mb-1'>Risk Score</p>
                <p className='text-danger font-bold'>{selectedNode.riskScore}%</p>
              </div>
              <div className='bg-dark-bg/50 p-3 rounded-lg'>
                <p className='text-text-secondary text-xs mb-1'>Type</p>
                <p className='text-cyan-accent capitalize'>{selectedNode.type.replace('_', ' ')}</p>
              </div>
              <div className='bg-dark-bg/50 p-3 rounded-lg'>
                <p className='text-text-secondary text-xs mb-1'>Connected To</p>
                <p className='text-success font-bold'>
                  {network.edges.filter((e: any) => e.source.id === selectedNode.id || e.target.id === selectedNode.id).length}
                </p>
              </div>
            </div>

            {/* Connected Nodes */}
            <div className='mt-4'>
              <p className='text-sm font-semibold text-white mb-3'>Connected Nodes</p>
              <div className='space-y-2'>
                {network.edges
                  .filter((e: any) => e.source.id === selectedNode.id || e.target.id === selectedNode.id)
                  .map((edge: any, i: number) => {
                    const connectedNodeId = edge.source.id === selectedNode.id ? edge.target.id : edge.source.id;
                    const connectedNode = network.nodes.find((n: any) => n.id === connectedNodeId);
                    return (
                      <div key={i} className='flex items-center justify-between p-2 bg-dark-bg/50 rounded'>
                        <span className='text-sm'>{connectedNode?.label}</span>
                        <span className='text-text-secondary text-xs'>{edge.label}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ScamNetworkVisualization;
