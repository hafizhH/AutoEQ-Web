import matplotlib.pyplot as plt
import csv

def makeimg(csvpath,outpath,presetname):
    freqarr=[]
    amparr=[]
    with open(csvpath) as f:
        reader=csv.reader(f,delimiter=',')
        cnt=0
        for i in reader:
            if cnt==0:
                cnt=cnt+1
                if i[0]=='frequency':
                    continue
            freqarr.append(float(i[0]))
            amparr.append(float(i[1]))
    plt.plot(freqarr,amparr)
    plt.xscale("log")
    plt.title(presetname)
    plt.savefig(outpath)
    plt.close()