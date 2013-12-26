from django.db import models

class Location(models.Model):
  name = models.CharField(max_length=100)
  address = models.CharField(max_length=250)

class Goal(models.Model):
  brief = models.CharField(max_length=100)
  details = models.TextField()

class Question(models.Model):
  brief = models.CharField(max_length=100)
  details = models.TextField()
  answer = models.TextField()

class Status(models.Model):
  text = models.TextField()
  lb = models.DecimalField(max_digits=4, decimal_places=4)

class Event(models.Model):
  start_time = models.DateTimeField()
  end_time = models.DateTimeField()
  prior_status = models.OneToOneField(Status)
  location = models.ForeignKey(Location)
  goals = models.ManyToManyField(Goal)
  questions = models.ManyToManyField(Question)

class Rating(models.Model):
  rating = models.SmallIntegerField()
  goal = models.ForeignKey(Goal)
  question = models.ForeignKey(Question)
  status = models.ForeignKey(Status)
  event = models.ForeignKey(Event)
