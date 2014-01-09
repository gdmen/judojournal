from django.db import models
from django.contrib.auth.models import User, Permission, Group

class HasUser(models.Model):
  user = models.ForeignKey(User)
  class Meta:
    abstract = True
    
class HasRating(models.Model):
  rating = models.SmallIntegerField()
  class Meta:
    abstract = True

class Location(HasUser):
  name = models.CharField(max_length=100)
  address = models.CharField(max_length=250)

class Goal(HasUser, HasRating):
  brief = models.CharField(max_length=100)
  details = models.TextField(blank=True)

class Question(HasUser):
  brief = models.CharField(max_length=100)
  details = models.TextField(blank=True)
  answer = models.TextField(blank=True)

class Status(HasUser, HasRating):
  text = models.TextField(blank=True)
  lbs = models.DecimalField(max_digits=8, decimal_places=4)

class Event(HasUser, HasRating):
  start_time = models.DateTimeField()
  end_time = models.DateTimeField()
  prior_status = models.OneToOneField(Status, blank=True, null=True)
  location = models.ForeignKey(Location, blank=True, null=True)
  goals = models.ManyToManyField(Goal, blank=True, null=True)
  questions = models.ManyToManyField(Question, blank=True, null=True)
