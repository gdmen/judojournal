from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

from apps.api import views

from api.resources import LocationResource

location_resource = LocationResource()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'apps.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    
    url(r'^accounts/', include('registration.backends.default.urls')),
    
    url(r'^account/', include('django.contrib.auth.urls')),
    
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^api/', include(location_resource.urls)),
)
