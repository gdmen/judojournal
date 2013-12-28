from django.contrib import admin

from apps.api.models import *

"""
class HasUserAdmin(admin.ModelAdmin):
  model = None
  exclude = ('user',)
  def save_model(self, request, obj, form, change):
    if not change:
      obj.user = request.user
    obj.save()
  def queryset(self, request):
    if request.user.is_superuser:
      return self.model.objects.all()
    return self.model.objects.filter(user=request.user)
  def has_change_permission(self, request, obj=None):
    return obj is None or self.queryset(request).filter(pk=obj.pk).count() > 0
  class Meta:
    abstract = True

class LocationAdmin(HasUserAdmin):
  model = Location
  
admin.site.register(Location, LocationAdmin)
"""

class LocationAdmin(admin.ModelAdmin):
  model = Location
  
admin.site.register(Location, LocationAdmin)