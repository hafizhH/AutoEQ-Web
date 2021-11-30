from django import forms

class UploadMeasurement(forms.Form):
    presetname = forms.CharField(max_length=50)
    file = forms.FileField()