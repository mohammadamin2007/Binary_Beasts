from django.contrib import admin
from .models import User, Questions, Comment


class UserAdmin(admin.ModelAdmin):
    pass


class QuestionsAdmin(admin.ModelAdmin):
    pass


class CommentAdmin(admin.ModelAdmin):
    pass


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Questions, QuestionsAdmin)
admin.site.register(Comment, CommentAdmin)
