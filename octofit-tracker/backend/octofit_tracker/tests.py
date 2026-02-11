from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name='Test Hero',
            email='testhero@test.com',
            team_id='test_team_123'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Test Hero')
        self.assertEqual(self.user.email, 'testhero@test.com')
        self.assertIsNotNone(self.user._id)

    def test_user_str(self):
        self.assertEqual(str(self.user), 'Test Hero')


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            description='Test Description'
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(self.team.description, 'Test Description')

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Test Team')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id='test_user_123',
            activity_type='Running',
            duration=30,
            distance=5.0,
            calories=300,
            date=timezone.now()
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.calories, 300)

    def test_activity_str(self):
        self.assertEqual(str(self.activity), 'Running - 30 mins')


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            team_id='test_team_123',
            total_points=1000,
            rank=1
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.total_points, 1000)
        self.assertEqual(self.leaderboard.rank, 1)


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='Test workout description',
            difficulty='medium',
            duration=45,
            category='Strength Training'
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.difficulty, 'medium')
        self.assertEqual(self.workout.duration, 45)

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Test Workout')


class UserAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            name='API Test Hero',
            email='apitest@test.com',
            team_id='api_test_team'
        )

    def test_get_users_list(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_detail(self):
        url = reverse('user-detail', args=[self.user._id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TeamAPITest(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='API Test Team',
            description='API test description'
        )

    def test_get_teams_list(self):
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ActivityAPITest(APITestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id='api_test_user',
            activity_type='Swimming',
            duration=40,
            distance=2.5,
            calories=400,
            date=timezone.now()
        )

    def test_get_activities_list(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            team_id='api_test_team',
            total_points=5000,
            rank=1
        )

    def test_get_leaderboard_list(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='API Test Workout',
            description='API test workout description',
            difficulty='hard',
            duration=60,
            category='Cardio'
        )

    def test_get_workouts_list(self):
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
