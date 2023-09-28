# Generated by Django 4.2.5 on 2023-09-27 13:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainApi', '0006_alter_user_score'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.CharField(default='', max_length=200)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApi.user')),
            ],
        ),
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(default='', max_length=200)),
                ('explanation', models.CharField(default='', max_length=200)),
                ('field', models.CharField(default='', max_length=200)),
                ('peopleToShow', models.CharField(default='', max_length=200)),
                ('deadLine', models.DateField(auto_now_add=True, max_length=200)),
                ('file1', models.FileField(upload_to='uploads/')),
                ('file2', models.FileField(upload_to='uploads/')),
                ('comments', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApi.comment')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApi.user')),
            ],
        ),
    ]