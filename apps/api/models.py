from django.db import models
from django.contrib.auth.models import User

"""
  Abstract Helpers
"""
class HasUser(models.Model):
  user = models.ForeignKey(User)
  class Meta:
    abstract = True
    
class HasRating(models.Model):
  rating = models.SmallIntegerField()
  class Meta:
    abstract = True

"""
  Entry components
"""
class Location(HasUser):
  name = models.CharField(max_length=140)
  url = models.CharField(max_length=250, blank=True)
  address = models.CharField(max_length=250, blank=True)

class Goal(HasUser):
  brief = models.CharField(max_length=140)
  details = models.TextField(blank=True)
  created = models.DateTimeField(auto_now_add=True)

class GoalInstance(HasUser, HasRating):
  goal = models.ForeignKey(Goal)
  details = models.TextField(blank=True)
  created = models.DateTimeField(auto_now_add=True)

class EntryType(HasUser):
  # e.g. 'Judo'
  name = models.TextField()
  # e.g. 'Open Mat'
  type = models.TextField(blank=True)

"""
  Abstract Entry
"""
class AbstractEntry(HasUser, HasRating):
  start = models.DateTimeField()
  end = models.DateTimeField()
  pre_status = models.TextField(blank=True)
  post_status = models.TextField(blank=True)
  type = models.ForeignKey(EntryType)
  location = models.ForeignKey(Location)
  goals = models.ManyToManyField(GoalInstance, blank=True, null=True)
  class Meta:
    abstract = True
    
class AbstractEntryModule(HasUser, HasRating):
  details = models.TextField(blank=True)
  class Meta:
    abstract = True

"""
  Judo, BJJ entry
"""
# Drills
class DrillEntryModule(AbstractEntryModule):
  pass

# Randori
class RandoriEntryModule(AbstractEntryModule):
  partner = models.CharField(max_length=140, blank=True)
  # duration
  minutes = models.DecimalField(max_digits=5, decimal_places=2, null=True)

class EntryA(AbstractEntry):
  drills = models.ManyToManyField(DrillEntryModule, blank=True, null=True)
  randori = models.ManyToManyField(RandoriEntryModule, blank=True, null=True)

"""
  Misc
"""
class Question(HasUser):
  brief = models.CharField(max_length=140)
  details = models.TextField(blank=True)
  answer = models.TextField(blank=True)
  created = models.DateTimeField(auto_now_add=True)

class Technique(HasUser):
  # csv names
  names = models.TextField()
  brief = models.CharField(max_length=140)
  principles = models.TextField(blank=True)

class TechniqueVariation(HasUser):
  technique = models.ForeignKey(Technique)
  # csv names
  names = models.TextField()
  steps = models.TextField(blank=True)