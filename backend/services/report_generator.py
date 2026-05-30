from typing import Dict

class ReportGenerator:
    def __init__(self, api_key: str = None):
        self.api_key = api_key

    def generate_investigation_report(self, transaction: Dict, prediction: Dict) -> Dict:
        # Placeholder: integrate Gemini API here to produce human-readable reports
        # For now, return a structured summary
        reasons = []
        if transaction.get('amount', 0) > 10000:
            reasons.append('High transaction amount')
        if transaction.get('device') == 'new_device':
            reasons.append('New device used')
        if prediction.get('risk_score', 0) >= 80:
            reasons.append('High model risk score')

        summary = {
            'transaction_id': transaction.get('id'),
            'summary': ' ; '.join(reasons) if reasons else 'No obvious factors',
            'recommendation': 'Escalate' if prediction.get('risk_score', 0) >= 80 else 'Monitor',
            'details': {
                'prediction': prediction,
                'transaction': transaction,
            }
        }
        return summary
