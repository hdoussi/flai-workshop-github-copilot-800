from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'team_id', 'created_at']
    search_fields = ['name', 'email']
    list_filter = ['created_at']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    search_fields = ['name']
    list_filter = ['created_at']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['activity_type', 'user_id', 'duration', 'distance', 'calories', 'date']
    search_fields = ['user_id', 'activity_type']
    list_filter = ['activity_type', 'date']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['rank', 'team_id', 'total_points', 'last_updated']
    list_filter = ['rank', 'last_updated']
    ordering = ['rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'difficulty', 'duration', 'created_at']
    search_fields = ['name', 'category']
    list_filter = ['difficulty', 'category', 'created_at']
