from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

from rest_framework import routers
from apps.api import views

api_router = routers.DefaultRouter(trailing_slash=False)
api_router.register(r'permissions', views.PermissionViewSet)
api_router.register(r'groups', views.GroupViewSet)
api_router.register(r'users', views.UserViewSet)
api_router.register(r'locations', views.LocationViewSet)
api_router.register(r'goals', views.GoalViewSet)
api_router.register(r'questions', views.QuestionViewSet)
api_router.register(r'statuses', views.StatusViewSet)
api_router.register(r'activities', views.ActivityViewSet)
api_router.register(r'events', views.EventViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'apps.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    
    url(r'^accounts/', include('registration.backends.default.urls')),
    
    url(r'^account/', include('django.contrib.auth.urls')),
    
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^api/', include(api_router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)
