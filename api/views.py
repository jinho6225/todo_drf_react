from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def apiOverview(request):
    return JsonResponse("hello world", safe=False)