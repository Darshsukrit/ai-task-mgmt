from collections import Counter, defaultdict
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from app.models.activity import Activity
from app.models.productivity_log import ProductivityLog


def _productivity_trend(dates: List[datetime], scores: List[float]) -> str:
    if len(scores) < 2:
        return "stable"
    midpoint = len(scores) // 2
    first_half = sum(scores[:midpoint]) / max(len(scores[:midpoint]), 1)
    second_half = sum(scores[midpoint:]) / max(len(scores[midpoint:]), 1)
    if second_half >= first_half * 1.05:
        return "improving"
    if second_half <= first_half * 0.95:
        return "declining"
    return "stable"


def calculate_peak_window(activities: List[Activity]) -> Optional[str]:
    if not activities:
        return None

    hour_counts = Counter(activity.timestamp.hour for activity in activities if activity.timestamp)
    if not hour_counts:
        return None

    peak_hour, _ = hour_counts.most_common(1)[0]
    start = peak_hour
    end = (peak_hour + 3) % 24
    return f"Peak productivity detected around {start}:00–{end}:00."


def summarize_productivity(
    productivity_logs: List[ProductivityLog],
    activities: List[Activity],
) -> Dict[str, object]:
    if not productivity_logs:
        return {
            "productivity_score": 0,
            "focus_hours": 0,
            "distraction_count": 0,
            "consistency": "none",
            "trend": "stable",
            "peak_window": None,
            "recommendations": ["No productivity log data available."],
        }

    logs_by_date = defaultdict(list)
    for log in productivity_logs:
        logs_by_date[log.date].append(log)

    dates = sorted(logs_by_date)
    average_scores = []
    total_focus = 0.0
    total_distraction = 0

    for date in dates:
        day_scores = [entry.productivity_score for entry in logs_by_date[date] if entry.productivity_score is not None]
        total_focus += sum(entry.focus_hours or 0.0 for entry in logs_by_date[date])
        total_distraction += sum(entry.distraction_count or 0 for entry in logs_by_date[date])
        if day_scores:
            average_scores.append(sum(day_scores) / len(day_scores))

    overall_score = round(sum(average_scores) / max(len(average_scores), 1), 1)
    total_days = len(dates)
    consistency = "consistent" if total_days >= 4 else "intermittent"
    trend = _productivity_trend(dates, average_scores)
    peak_window_text = calculate_peak_window(activities)

    recommendations = []
    if overall_score >= 75:
        recommendations.append("Sustain the current focus level and protect core work blocks.")
    else:
        recommendations.append("Reduce distractions and increase deep work sessions.")
    if total_distraction / max(total_days, 1) > 3:
        recommendations.append("Distraction count is high; review task switching and notifications.")
    if consistency == "intermittent":
        recommendations.append("Aim for more regular daily work sessions to improve productivity stability.")

    return {
        "productivity_score": overall_score,
        "focus_hours": round(total_focus, 1),
        "distraction_count": total_distraction,
        "consistency": consistency,
        "trend": trend,
        "peak_window": peak_window_text,
        "recommendations": recommendations,
    }
