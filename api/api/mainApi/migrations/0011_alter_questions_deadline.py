# Generated by Django 4.2.5 on 2023-09-27 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApi', '0010_alter_questions_file1_alter_questions_file2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions',
            name='deadLine',
            field=models.CharField(default='', max_length=200),
        ),
    ]
