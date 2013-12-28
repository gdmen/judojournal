from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

from rest_framework import routers
from apps.api import views

router = routers.DefaultRouter()
router.register(r'permissions', views.PermissionViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'locations', views.LocationViewSet)
router.register(r'goals', views.GoalViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'statuses', views.StatusViewSet)
router.register(r'events', views.EventViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'apps.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    
    (r'^accounts/', include('registration.backends.default.urls')),
    
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)
