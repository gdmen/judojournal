#!/home5/garymene/python27/bin/python
try:
    import pymysql
    pymysql.install_as_MySQLdb()
except ImportError:
    pass
import sys, os

# Add a custom Python path. (optional)
sys.path.insert(0, "/home5/garymene/git/judojournal")

# Switch to the directory of your project.
os.chdir("/home5/garymene/git/judojournal")

# Set the DJANGO_SETTINGS_MODULE environment variable.
os.environ["DJANGO_SETTINGS_MODULE"] = "judojournal.settings"
from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")
