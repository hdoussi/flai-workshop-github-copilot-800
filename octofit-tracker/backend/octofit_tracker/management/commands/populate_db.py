from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
import random
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Clearing existing data...')
        
        # Delete all existing data using Django ORM
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared!'))
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League Champions'
        )
        self.stdout.write(self.style.SUCCESS(f'Created teams: {team_marvel.name}, {team_dc.name}'))
        
        # Create Users (Superheroes)
        self.stdout.write('Creating superhero users...')
        marvel_heroes = [
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com'},
            {'name': 'Steve Rogers', 'email': 'captainamerica@marvel.com'},
            {'name': 'Thor Odinson', 'email': 'thor@marvel.com'},
            {'name': 'Bruce Banner', 'email': 'hulk@marvel.com'},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@marvel.com'},
            {'name': 'Peter Parker', 'email': 'spiderman@marvel.com'},
        ]
        
        dc_heroes = [
            {'name': 'Clark Kent', 'email': 'superman@dc.com'},
            {'name': 'Bruce Wayne', 'email': 'batman@dc.com'},
            {'name': 'Diana Prince', 'email': 'wonderwoman@dc.com'},
            {'name': 'Barry Allen', 'email': 'flash@dc.com'},
            {'name': 'Arthur Curry', 'email': 'aquaman@dc.com'},
            {'name': 'Hal Jordan', 'email': 'greenlantern@dc.com'},
        ]
        
        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team_id=str(team_marvel._id)
            )
            marvel_users.append(user)
            
        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team_id=str(team_dc._id)
            )
            dc_users.append(user)
        
        all_users = marvel_users + dc_users
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_users)} superhero users'))
        
        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Cycling', 'Swimming', 'Strength Training', 'Yoga', 'Boxing']
        activities_created = 0
        
        for user in all_users:
            # Create 5-10 activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 120)
                distance = round(random.uniform(2.0, 15.0), 2) if activity_type in ['Running', 'Cycling', 'Swimming'] else None
                calories = duration * random.randint(5, 12)
                
                Activity.objects.create(
                    user_id=str(user._id),
                    activity_type=activity_type,
                    duration=duration,
                    distance=distance,
                    calories=calories,
                    date=timezone.now() - timedelta(days=random.randint(0, 30))
                )
                activities_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {activities_created} activities'))
        
        # Calculate and create Leaderboard entries
        self.stdout.write('Creating leaderboard...')
        
        marvel_points = 0
        for user in marvel_users:
            user_activities = Activity.objects.filter(user_id=str(user._id))
            marvel_points += sum(activity.calories for activity in user_activities)
        
        dc_points = 0
        for user in dc_users:
            user_activities = Activity.objects.filter(user_id=str(user._id))
            dc_points += sum(activity.calories for activity in user_activities)
        
        # Determine ranks
        if marvel_points > dc_points:
            marvel_rank, dc_rank = 1, 2
        else:
            marvel_rank, dc_rank = 2, 1
        
        Leaderboard.objects.create(
            team_id=str(team_marvel._id),
            total_points=marvel_points,
            rank=marvel_rank
        )
        
        Leaderboard.objects.create(
            team_id=str(team_dc._id),
            total_points=dc_points,
            rank=dc_rank
        )
        
        self.stdout.write(self.style.SUCCESS(f'Leaderboard created - Marvel: {marvel_points} pts (Rank {marvel_rank}), DC: {dc_points} pts (Rank {dc_rank})'))
        
        # Create Workouts
        self.stdout.write('Creating workout suggestions...')
        workouts_data = [
            {
                'name': 'Superhero Circuit',
                'description': 'High-intensity circuit training inspired by superhero training',
                'difficulty': 'hard',
                'duration': 45,
                'category': 'Strength Training'
            },
            {
                'name': 'Speed Force Sprint',
                'description': 'Sprint intervals to build speed and endurance',
                'difficulty': 'medium',
                'duration': 30,
                'category': 'Running'
            },
            {
                'name': 'Asgardian Strength',
                'description': 'Heavy lifting focused on building godly strength',
                'difficulty': 'hard',
                'duration': 60,
                'category': 'Strength Training'
            },
            {
                'name': 'Stark Tech Cardio',
                'description': 'Advanced cardio workout for peak performance',
                'difficulty': 'medium',
                'duration': 40,
                'category': 'Cycling'
            },
            {
                'name': 'Atlantean Swimming',
                'description': 'Swimming workout for underwater endurance',
                'difficulty': 'easy',
                'duration': 35,
                'category': 'Swimming'
            },
            {
                'name': 'Zen Master Yoga',
                'description': 'Mindful yoga for flexibility and inner peace',
                'difficulty': 'easy',
                'duration': 45,
                'category': 'Yoga'
            },
            {
                'name': 'Warrior Combat Training',
                'description': 'Boxing and martial arts combination workout',
                'difficulty': 'hard',
                'duration': 50,
                'category': 'Boxing'
            },
            {
                'name': 'Hero Endurance Run',
                'description': 'Long-distance run for stamina building',
                'difficulty': 'medium',
                'duration': 60,
                'category': 'Running'
            }
        ]
        
        for workout_data in workouts_data:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts_data)} workout suggestions'))
        
        self.stdout.write(self.style.SUCCESS('Database population complete!'))
        self.stdout.write(f'Total Users: {User.objects.count()}')
        self.stdout.write(f'Total Teams: {Team.objects.count()}')
        self.stdout.write(f'Total Activities: {Activity.objects.count()}')
        self.stdout.write(f'Total Leaderboard Entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Total Workouts: {Workout.objects.count()}')
