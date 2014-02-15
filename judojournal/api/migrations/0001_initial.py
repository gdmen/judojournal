# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'UserProfile'
        db.create_table(u'api_userprofile', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], unique=True)),
            ('public', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal(u'api', ['UserProfile'])

        # Adding model 'Goal'
        db.create_table(u'api_goal', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('brief', self.gf('django.db.models.fields.CharField')(unique=True, max_length=140)),
            ('details', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'api', ['Goal'])

        # Adding model 'GoalInstance'
        db.create_table(u'api_goalinstance', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('rating', self.gf('django.db.models.fields.SmallIntegerField')()),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('goal', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['api.Goal'])),
            ('details', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'api', ['GoalInstance'])

        # Adding model 'Art'
        db.create_table(u'api_art', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('name', self.gf('django.db.models.fields.CharField')(unique=True, max_length=140)),
        ))
        db.send_create_signal(u'api', ['Art'])

        # Adding model 'Type'
        db.create_table(u'api_type', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('name', self.gf('django.db.models.fields.CharField')(unique=True, max_length=140)),
        ))
        db.send_create_signal(u'api', ['Type'])

        # Adding model 'Location'
        db.create_table(u'api_location', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('name', self.gf('django.db.models.fields.CharField')(unique=True, max_length=140)),
            ('url', self.gf('django.db.models.fields.URLField')(max_length=200, blank=True)),
        ))
        db.send_create_signal(u'api', ['Location'])

        # Adding model 'NoteModule'
        db.create_table(u'api_notemodule', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('details', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('title', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal(u'api', ['NoteModule'])

        # Adding model 'DrillModule'
        db.create_table(u'api_drillmodule', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('details', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('name', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal(u'api', ['DrillModule'])

        # Adding model 'SparringModule'
        db.create_table(u'api_sparringmodule', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('details', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('partner', self.gf('django.db.models.fields.CharField')(max_length=140, blank=True)),
            ('minutes', self.gf('django.db.models.fields.DecimalField')(null=True, max_digits=5, decimal_places=2)),
        ))
        db.send_create_signal(u'api', ['SparringModule'])

        # Adding model 'JudoEntry'
        db.create_table(u'api_judoentry', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('rating', self.gf('django.db.models.fields.SmallIntegerField')()),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('start', self.gf('django.db.models.fields.DateTimeField')()),
            ('end', self.gf('django.db.models.fields.DateTimeField')()),
            ('art', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['api.Art'])),
            ('type', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['api.Type'])),
            ('location', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['api.Location'])),
        ))
        db.send_create_signal(u'api', ['JudoEntry'])

        # Adding M2M table for field goals on 'JudoEntry'
        m2m_table_name = db.shorten_name(u'api_judoentry_goals')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('judoentry', models.ForeignKey(orm[u'api.judoentry'], null=False)),
            ('goalinstance', models.ForeignKey(orm[u'api.goalinstance'], null=False))
        ))
        db.create_unique(m2m_table_name, ['judoentry_id', 'goalinstance_id'])

        # Adding M2M table for field drills on 'JudoEntry'
        m2m_table_name = db.shorten_name(u'api_judoentry_drills')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('judoentry', models.ForeignKey(orm[u'api.judoentry'], null=False)),
            ('drillmodule', models.ForeignKey(orm[u'api.drillmodule'], null=False))
        ))
        db.create_unique(m2m_table_name, ['judoentry_id', 'drillmodule_id'])

        # Adding M2M table for field sparring on 'JudoEntry'
        m2m_table_name = db.shorten_name(u'api_judoentry_sparring')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('judoentry', models.ForeignKey(orm[u'api.judoentry'], null=False)),
            ('sparringmodule', models.ForeignKey(orm[u'api.sparringmodule'], null=False))
        ))
        db.create_unique(m2m_table_name, ['judoentry_id', 'sparringmodule_id'])

        # Adding M2M table for field notes on 'JudoEntry'
        m2m_table_name = db.shorten_name(u'api_judoentry_notes')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('judoentry', models.ForeignKey(orm[u'api.judoentry'], null=False)),
            ('notemodule', models.ForeignKey(orm[u'api.notemodule'], null=False))
        ))
        db.create_unique(m2m_table_name, ['judoentry_id', 'notemodule_id'])

        # Adding model 'Question'
        db.create_table(u'api_question', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('brief', self.gf('django.db.models.fields.CharField')(unique=True, max_length=140)),
            ('details', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('answer', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'api', ['Question'])

        # Adding model 'Technique'
        db.create_table(u'api_technique', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('names', self.gf('django.db.models.fields.TextField')()),
            ('brief', self.gf('django.db.models.fields.CharField')(max_length=140)),
            ('principles', self.gf('django.db.models.fields.TextField')(blank=True)),
        ))
        db.send_create_signal(u'api', ['Technique'])

        # Adding model 'TechniqueVariation'
        db.create_table(u'api_techniquevariation', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('technique', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['api.Technique'])),
            ('names', self.gf('django.db.models.fields.TextField')()),
            ('steps', self.gf('django.db.models.fields.TextField')(blank=True)),
        ))
        db.send_create_signal(u'api', ['TechniqueVariation'])


    def backwards(self, orm):
        # Deleting model 'UserProfile'
        db.delete_table(u'api_userprofile')

        # Deleting model 'Goal'
        db.delete_table(u'api_goal')

        # Deleting model 'GoalInstance'
        db.delete_table(u'api_goalinstance')

        # Deleting model 'Art'
        db.delete_table(u'api_art')

        # Deleting model 'Type'
        db.delete_table(u'api_type')

        # Deleting model 'Location'
        db.delete_table(u'api_location')

        # Deleting model 'NoteModule'
        db.delete_table(u'api_notemodule')

        # Deleting model 'DrillModule'
        db.delete_table(u'api_drillmodule')

        # Deleting model 'SparringModule'
        db.delete_table(u'api_sparringmodule')

        # Deleting model 'JudoEntry'
        db.delete_table(u'api_judoentry')

        # Removing M2M table for field goals on 'JudoEntry'
        db.delete_table(db.shorten_name(u'api_judoentry_goals'))

        # Removing M2M table for field drills on 'JudoEntry'
        db.delete_table(db.shorten_name(u'api_judoentry_drills'))

        # Removing M2M table for field sparring on 'JudoEntry'
        db.delete_table(db.shorten_name(u'api_judoentry_sparring'))

        # Removing M2M table for field notes on 'JudoEntry'
        db.delete_table(db.shorten_name(u'api_judoentry_notes'))

        # Deleting model 'Question'
        db.delete_table(u'api_question')

        # Deleting model 'Technique'
        db.delete_table(u'api_technique')

        # Deleting model 'TechniqueVariation'
        db.delete_table(u'api_techniquevariation')


    models = {
        u'api.art': {
            'Meta': {'object_name': 'Art'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '140'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.drillmodule': {
            'Meta': {'object_name': 'DrillModule'},
            'details': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.TextField', [], {}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.goal': {
            'Meta': {'object_name': 'Goal'},
            'brief': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '140'}),
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'details': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.goalinstance': {
            'Meta': {'object_name': 'GoalInstance'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'details': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'goal': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['api.Goal']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'rating': ('django.db.models.fields.SmallIntegerField', [], {}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.judoentry': {
            'Meta': {'object_name': 'JudoEntry'},
            'art': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['api.Art']"}),
            'drills': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['api.DrillModule']", 'null': 'True', 'blank': 'True'}),
            'end': ('django.db.models.fields.DateTimeField', [], {}),
            'goals': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['api.GoalInstance']", 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'location': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['api.Location']"}),
            'notes': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['api.NoteModule']", 'null': 'True', 'blank': 'True'}),
            'rating': ('django.db.models.fields.SmallIntegerField', [], {}),
            'sparring': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['api.SparringModule']", 'null': 'True', 'blank': 'True'}),
            'start': ('django.db.models.fields.DateTimeField', [], {}),
            'type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['api.Type']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.location': {
            'Meta': {'object_name': 'Location'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '140'}),
            'url': ('django.db.models.fields.URLField', [], {'max_length': '200', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.notemodule': {
            'Meta': {'object_name': 'NoteModule'},
            'details': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'title': ('django.db.models.fields.TextField', [], {}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.question': {
            'Meta': {'object_name': 'Question'},
            'answer': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'brief': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '140'}),
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'details': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.sparringmodule': {
            'Meta': {'object_name': 'SparringModule'},
            'details': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'minutes': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '5', 'decimal_places': '2'}),
            'partner': ('django.db.models.fields.CharField', [], {'max_length': '140', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.technique': {
            'Meta': {'object_name': 'Technique'},
            'brief': ('django.db.models.fields.CharField', [], {'max_length': '140'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'names': ('django.db.models.fields.TextField', [], {}),
            'principles': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.techniquevariation': {
            'Meta': {'object_name': 'TechniqueVariation'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'names': ('django.db.models.fields.TextField', [], {}),
            'steps': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'technique': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['api.Technique']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.type': {
            'Meta': {'object_name': 'Type'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '140'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'api.userprofile': {
            'Meta': {'object_name': 'UserProfile'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'public': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'unique': 'True'})
        },
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Permission']"}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['api']