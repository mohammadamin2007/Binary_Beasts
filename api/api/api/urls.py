"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from mainApi import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'user', views.UserView, 'user')
router.register(r'questions', views.QuestionView, 'questions')
router.register(r'comment', views.CommentView, 'comment')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('login/', views.CustomAuthToken.as_view()),
    path('loginStatus/', views.HashedCodeStatus.as_view()),
    path('getUserData/', views.GetUserDataWithHash.as_view()),
    path('addNewQuestion', views.addQuestion.as_view()),
    path('addComment/', views.AddComment.as_view()),
    path('changePassword/', views.changePassword.as_view()),
    path('getRangeQuestion', views.RangedQuestionView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
