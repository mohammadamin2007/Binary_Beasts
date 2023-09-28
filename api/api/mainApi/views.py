from django.views import View
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes
from .models import User, Questions, Comment
from .serializers import UserSerializer, QuestionSerializer, CommentSerializer
import hashlib
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core import serializers


# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class QuestionView(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Questions.objects.all()


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


activeUsers = []


@method_decorator(csrf_exempt, name='dispatch')
class CustomAuthToken(View):
    def post(self, request):
        sent_user_data = json.loads(request.body)
        user_data = ""
        user_found = False
        for i in User.objects.all():
            if i.user_name == sent_user_data["user_name"]:
                user_found = True
                user_data = i
                break
        if user_found and user_data.password == sent_user_data["password"]:
            activeUsers.append(hashlib.sha256(user_data.password.encode()).hexdigest())
            return JsonResponse({"passwordHash": hashlib.sha256(user_data.password.encode()).hexdigest()})
        else:
            return JsonResponse({"error": "NOTFOUND"})


@method_decorator(csrf_exempt, name="dispatch")
class HashedCodeStatus(View):
    def post(self, request):
        sent_data = json.loads(request.body)
        if sent_data['user_password'] in activeUsers:
            return JsonResponse({"status": "active"})
        else:
            return JsonResponse({"status": "not active"})


@method_decorator(csrf_exempt, name="dispatch")
class GetUserDataWithHash(View):
    def post(self, request):
        sent_data = json.loads(request.body)
        for i in User.objects.all():
            if hashlib.sha256(i.password.encode()).hexdigest() == sent_data['user_password']:
                return JsonResponse(serializers.serialize('json', [i]), safe=False)
        return JsonResponse({"status": "not active"})


@parser_classes([MultiPartParser])
@method_decorator(csrf_exempt, name="dispatch")
class addQuestion(View):
    def post(self, request):
        sent_data = request.POST

        question = Questions.objects.create(sender=User.objects.get(user_name=sent_data.get('userName')),
                                            title=sent_data.get('title'), explanation=sent_data.get('explanation'),
                                            field=sent_data.get('field'), peopleToShow=sent_data.get('peopleToShow'),
                                            deadLine=sent_data.get('deadLine'), file1=request.FILES.get('file1'),
                                            file2=request.FILES.get('file1'), tags=sent_data.get('tags'))
        user = User.objects.get(user_name=sent_data.get('userName'))
        user.score += 20
        user.save()
        return JsonResponse({"pass": "true"})


@method_decorator(csrf_exempt, name="dispatch")
class AddComment(View):
    def post(self, request):
        sent_data = request.POST
        question = Questions.objects.get(id=sent_data.get("id"))
        comment = Comment.objects.create(sender=User.objects.get(user_name=sent_data.get("sender")),
                                         body=sent_data.get("body"), file1=request.FILES.get('file1'),
                                         file2=request.FILES.get('file2'))
        user = User.objects.get(user_name=sent_data['sender'])
        user.score += 10
        user.save()
        question.comments.add(comment)
        comment.save()
        question.save()
        return JsonResponse({"pass": "true"})


@method_decorator(csrf_exempt, name="dispatch")
class changePassword(View):
    def post(self, request):
        sent_data = json.loads(request.body)
        user = User.objects.get(user_name=sent_data['userName'])
        user.password = sent_data['password']
        user.save()
        return JsonResponse({"pass": "true "})


@method_decorator(csrf_exempt, name="dispatch")
class RangedQuestionView(View):
    def post(self, request):
        sent_data = json.loads(request.body)
        end_number = sent_data['start_number'] + 11
        queryset = Questions.objects.filter(id__gte=sent_data['start_number'], id__lt=end_number)
        serializer = QuestionSerializer(queryset, many=True)
        response_data = serializer.data
        return JsonResponse(response_data, safe=False)

