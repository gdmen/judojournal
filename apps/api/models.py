from django.db import models
from django.contrib.auth.models import User

class HasUser(models.Model):
  user = models.ForeignKey(User)
  class Meta:
    abstract = True

class Location(HasUser):
  name = models.CharField(max_length=100)
  address = models.CharField(max_length=250)

class Goal(HasUser):
  brief = models.CharField(max_length=100)
  details = models.TextField(blank=True)

class Question(HasUser):
  brief = models.CharField(max_length=100)
  details = models.TextField(blank=True)
  answer = models.TextField(blank=True)

class Status(HasUser):
  text = models.TextField(blank=True)
  lbs = models.DecimalField(max_digits=4, decimal_places=4)

class Event(HasUser):
  start_time = models.DateTimeField()
  end_time = models.DateTimeField()
  prior_status = models.OneToOneField(Status)
  location = models.ForeignKey(Location)
  goals = models.ManyToManyField(Goal)
  questions = models.ManyToManyField(Question)

class Rating(HasUser):
  rating = models.SmallIntegerField()
  goal = models.ForeignKey(Goal)
  question = models.ForeignKey(Question)
  status = models.ForeignKey(Status)
  event = models.ForeignKey(Event)
