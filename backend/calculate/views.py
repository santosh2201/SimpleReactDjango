from django.shortcuts import render
from django.http import JsonResponse

def index(request):
	status = 'error'
        message = 'Something went wrong! Please try again later'
	if request.GET.get('x'):
		x = int(request.GET['x'])
		y = int(request.GET['y'])
		o = request.GET['o']
		status = 'success'
		if o == 'add':
			message = x+y
		elif o == 'sub':
			message = x-y
		elif o == 'div':
			if y != 0:	
				message = x/y
		elif o == 'mul':
			message = x*y
		elif o == 'rem':
			message = x%y
		else:
			status = 'fail'
			message = 'Dont waste your time!'
	return JsonResponse({'result': message, 'status': status})
