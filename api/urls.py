from django.urls import path
from .views import chooseTarget, getCustomizePreviewGraph, getDirData, getDirSource, getKey, index, inituser, targetlist, updatedata, uploadClientData, uploadCustomTarget, uploadmeasurements, uploadsoundsig

urlpatterns=[
    path('getDirSource',getDirSource),
    path('getDirData/<str:source>',getDirData),
    path('inituser',inituser),
    path('uploadmeasurement',uploadmeasurements),
    path('updateData',updatedata),
    path('targetList',targetlist),
    path('uploadClientData',chooseTarget),
    path('getKey',getKey),
    path('getCustomizePreviewGraph',getCustomizePreviewGraph),
    path('submitcustomization',uploadClientData),
    path('uploadCustomTarget',uploadCustomTarget),
    path('uploadsoundsig',uploadsoundsig),
    #path('',index)
]