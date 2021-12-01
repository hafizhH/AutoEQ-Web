from django.http.response import HttpResponseBadRequest
from django.shortcuts import render
from django.http import HttpResponse
from .forms import UploadMeasurement
from .bikin import makeimg
import os,json,csv,shutil
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .autoeq import batch_processing as eq

from AutoEQ_Web.settings import BASE_DIR

hasil_DIR=os.path.join(BASE_DIR,'hasil')

# Non-request Functions

def getKey(request):
    if not request.session.exists(request.session.session_key):
        request.session.create()
    a={
        'skey':request.session.session_key
    }
    a=json.dumps(a)
    return HttpResponse(a)

def createfolder(dir):
    try:
        os.makedirs(dir)
    except FileExistsError:
        shutil.rmtree(dir)
        os.makedirs(dir)

# POST API Call Functions
@csrf_exempt
def uploadmeasurements(request):
    if(request.method=='POST'):
        presetname=request.POST.get('presetName')
        skey=request.POST.get('skey')
        f=request.FILES.get('measurementCSV')
        path=os.path.join(hasil_DIR,skey,presetname,presetname)
        createfolder(path)
        csvpath=os.path.join(path,presetname+'.csv')
        with open(csvpath,'wb+') as file:
            for i in f.chunks():
                file.write(i)
        file.close()
        imgname=skey+'_'+presetname+'_input.png'
        outpath=os.path.join(BASE_DIR,'MEDIA',imgname)
        makeimg(csvpath,outpath,presetname)
        res={'imgurl':'http://localhost:8000/MEDIA/'+imgname}
        res=json.dumps(res)
        return HttpResponse(res)
    else:
        return render(request,'upload.html')

@csrf_exempt
def updatedata(request):
    if(request.method=='POST'):
        a=json.loads(request.body)
        presetname=a['presetName']
        source=a['source']
        type=a['type']
        model=a['model']
        skey=a['skey']
        sourcefile=os.path.join(BASE_DIR,'autoeqmeas','measurements',source,'data',type,model,model+'.csv')
        path=os.path.join(hasil_DIR,skey,presetname,presetname)
        createfolder(path)
        csvpath=os.path.join(path,presetname+'.csv')
        shutil.copy(sourcefile,csvpath)
        imgname=skey+'_'+presetname+'_input.png'
        outpath=os.path.join(BASE_DIR,'MEDIA',imgname)
        makeimg(csvpath,outpath,presetname)
        res={'imgurl':'http://localhost:8000/MEDIA/'+imgname}
        res=json.dumps(res)
        return HttpResponse(res)
    else:
        return HttpResponseBadRequest

@csrf_exempt
def chooseTarget(request):
    if(request.method=='POST'):
        a=json.loads(request.body)
        presetname=a['presetName']
        target=a['target']
        skey=a['skey']
        sourcefile=os.path.join(BASE_DIR,'autoeqmeas','compensation',target)
        destfile=os.path.join(hasil_DIR,skey,presetname,'target.csv')
        shutil.copy(sourcefile,destfile)
        imgname=skey+'_'+presetname+'_target.png'
        outpath=os.path.join(BASE_DIR,'MEDIA',imgname)
        makeimg(destfile,outpath,target)
        res={'imgurl':'http://localhost:8000/MEDIA/'+imgname}
        res=json.dumps(res)
        return HttpResponse(res)
    else:
        return HttpResponseBadRequest

@csrf_exempt
def getCustomizePreviewGraph(request):
    if(request.method=='POST'):
        a=json.loads(request.body)
        skey=a['skey']
        presetname=a['presetName']
        path=os.path.join(hasil_DIR,skey,presetname)
        eq(input_dir=os.path.join(path,presetname),output_dir=os.path.join(path,'output'),compensation=os.path.join(path,'target.csv'),equalize=True)
        sourcepng=os.path.join(path,'output',presetname+'.png')
        imgname=skey+'_'+presetname+'_preview.png'
        outpng=os.path.join(BASE_DIR,'MEDIA',imgname)
        shutil.copy(sourcepng,outpng)
        res={'imgurl':'http://localhost:8000/MEDIA/'+imgname}
        res=json.dumps(res)
        return HttpResponse(res)
    else:
        return HttpResponseBadRequest

@csrf_exempt
def uploadClientData(request):
    if(request.method=='POST'):
        a=json.loads(request.body)
        skey=a['skey']
        presetname=a['presetName']
        maxgain=a['maxGain']
        bassboost=a['bassBoost']
        tilt=a['tilt']
        treblemaxgain=a['trebleMaxGain']
        treblegaincoef=a['trebleGainCoef']
        trebleTransFreqStart=a['trebleTransFreqStart']
        trebleTransFreqEnd=a['trebleTransFreqEnd']

        
        #Parametric EQ
        peq=bool(a['peq'])
        maxfilter=int(a['maxFilters'])


        #Convolution EQ
        ceq=bool(a['ceq'])

        sr=[int(a['samplingRate'])]


        #Fixed Band EQ
        feq=bool(a['feq'])

        frequency=a['frequency']
        frequency=frequency.split(',')
        frequency=[float(i) for i in frequency]

        freqQ=a['freqQ']
        freqQ=freqQ.split(',')
        freqQ=[float(i) for i in freqQ]


        path=os.path.join(hasil_DIR,skey,presetname)
        eq(input_dir=os.path.join(path,presetname),output_dir=os.path.join(path,'output'),compensation=os.path.join(path,'target.csv'),equalize=True,parametric_eq=peq,fixed_band_eq=feq,fc=frequency,q=freqQ,max_filters=maxfilter,convolution_eq=ceq,fs=sr)
        sourcepng=os.path.join(path,'output',presetname+'.png')
        imgname=skey+'_'+presetname+'_preview.png'
        outpng=os.path.join(BASE_DIR,'MEDIA',imgname)
        shutil.copy(sourcepng,outpng)
        
        outputfolder=os.path.join(BASE_DIR,'MEDIA',skey)
        createfolder(outputfolder)
        output_filename=os.path.join(outputfolder,presetname)
        shutil.make_archive(output_filename, 'zip', os.path.join(path,'output'))

        res={'imgurl':'http://localhost:8000/MEDIA/'+imgname,'downloadurl':'http://localhost:8000/MEDIA/'+skey+'/'+presetname+'.zip'}
        res=json.dumps(res)
        return HttpResponse(res)
    else:
        return HttpResponseBadRequest

@csrf_exempt
def uploadCustomTarget(request):
    if(request.method=="POST"):
        presetname=request.POST.get('presetName')
        skey=request.POST.get('skey')
        f=request.FILES.get('targetCSV')
        path=os.path.join(hasil_DIR,skey,presetname)
        csvpath=os.path.join(path,'target.csv')
        with open(csvpath,'wb+') as file:
            for i in f.chunks():
                file.write(i)
        file.close()
        imgname=skey+'_'+presetname+'_target.png'
        outpath=os.path.join(BASE_DIR,'MEDIA',imgname)
        makeimg(csvpath,outpath,'Custom Target')
        res={'imgurl':'http://localhost:8000/MEDIA/'+imgname}
        res=json.dumps(res)
        return HttpResponse(res)
    else:
        return HttpResponseBadRequest


# GET API Call Functions

def getDirSource(request):
    path=os.path.join(BASE_DIR,'autoeqmeas','measurements')
    data={
        'sourcelist':[i for i in os.listdir(path)]
    }
    data=json.dumps(data)
    print(data)
    return HttpResponse(data)

def getDirData(request,source):
    path=os.path.join(BASE_DIR,'autoeqmeas','measurements',source,'data')
    a={i:None for i in os.listdir(path)}
    for folder in os.listdir(path):
        a[folder]=[]
        pathcloser=os.path.join(path,folder)
        for i in os.listdir(pathcloser):
            a[folder].append(i)
    a=json.dumps(a)
    return HttpResponse(a)

def inituser(request):
    skey=getKey(request)
    dir=os.path.join(hasil_DIR,skey)
    createfolder(dir)
    a={'skey':skey,'dir':dir}
    a=json.dumps(a)
    return HttpResponse(a)

def targetlist(request):
    path=os.path.join(BASE_DIR,'autoeqmeas','compensation')
    data={
        'targetList':[i for i in os.listdir(path)]
    }
    data=json.dumps(data)
    return HttpResponse(data)


#index

def index(request):
    return render(request,'index.html')