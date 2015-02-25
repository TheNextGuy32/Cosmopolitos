import matplotlib.pyplot as plt
import numpy as np
import math
import time
import matplotlib.animation as animation

np.random.seed()

culture_limit = 1.0
distance = culture_limit * 0.6
number_clusters = 40
number_per_cluster = 1
spread = False

north_color = (1,0,0)
east_color = (0.2,0.2,0.6)
south_color = (0.2,0.6,0)
west_color = (1,1,0)

people = list()

size = 400
alph = 1
linewidth = 0

def cap_color(color):
    if(color>1): 
        return 1
    return color
        
class Person:
    def __init__(self,x,y):
        self.worldliness=0.1
        self.x = x
        self.y = y
        
    def draw(self):
        self.size = size #* self.worldliness
        
        if(self.x>culture_limit): 
            self.x =culture_limit
        if(self.x<-culture_limit): 
            self.x =-culture_limit
        if(self.y>culture_limit): 
            self.y =culture_limit
        if(self.y<-culture_limit): 
            self.y =-culture_limit
        
        colors = [0,0,0]
        if(self.x>0 and self.y>0):
            colors[0] = (self.x*east_color[0]) + (self.y*north_color[0])
            colors[1] = (self.x*east_color[1]) + (self.y*north_color[1])
            colors[2] = (self.x*east_color[2]) + (self.y*north_color[2])
            
        elif(self.x<0 and self.y>0):
            colors[0] = math.fabs(self.x*west_color[0]) + self.y*north_color[0]
            colors[1] = math.fabs(self.x*west_color[1]) + self.y*north_color[1]
            colors[2] = math.fabs(self.x*west_color[2]) + self.y*north_color[2]
            
        elif(self.x<0 and self.y<0):
            colors[0] = math.fabs(self.x*west_color[0]) + math.fabs(self.y*south_color[0])
            colors[1] = math.fabs(self.x*west_color[1]) + math.fabs(self.y*south_color[1])
            colors[2] = math.fabs(self.x*west_color[2]) + math.fabs(self.y*south_color[2])
        else:
            colors[0] = self.x*east_color[0] + math.fabs(self.y*south_color[0])
            colors[1] = self.x*east_color[1] + math.fabs(self.y*south_color[1])
            colors[2] = self.x*east_color[2] + math.fabs(self.y*south_color[2])
            
        colors[0] = cap_color(colors[0])
        colors[1] = cap_color(colors[1])
        colors[2] = cap_color(colors[2])
        
        col = (colors[0],colors[1],colors[2])
        plt.scatter(self.x, self.y,c=col,s=self.size, alpha=alph, linewidths=linewidth)

   
def interact(a,b):
    #cd../documents/github/culturecolors
    distance = math.fabs(math.sqrt(((a.x-b.x)*(a.x-b.x)) + ((a.y-b.y)*(a.y-b.y))))
    
    a_magnitude = math.sqrt((a.x*a.x) + (a.y*a.y))
    b_magnitude = math.sqrt((b.x*b.x) + (b.y*b.y))
    
    a_angle = math.atan(a.y/a.x)
    b_angle = math.atan(b.y/b.x)
    
    a.x = math.cos(a_angle) * a_magnitude
    a.y = math.sin(a_angle) * a_magnitude
        
    b.x = math.cos(b_angle) * b_magnitude
    b.y = math.sin(b_angle) * b_magnitude
    
    
    #in any case move their angles closer together

def animate(i):
    plt.clf()
    plt.axis([-1, 1, -1, 1])
    
    index = 0
    for q in people:
        other_index = index
        while(other_index == index):
            other_index = np.random.random_integers(0,len(people)-1)
        interact( q, people[other_index] )
        index= index+1
    
    #Drawing people
    for i in people:
        i.draw()
        
       
    
    
#  Creating clusters    
for c in range(0, 40):
    angle = (2 * math.pi) / number_clusters * c 
    
    cluster_x = math.cos(angle) * distance
    cluster_y = math.sin(angle) * distance
    
    for n in range(0,number_per_cluster):
        shift_x = 0
        shift_y = 0
        if(spread):
            shift_x = ((np.random.random_sample()*2)-1)/10
            shift_y = ((np.random.random_sample()*2)-1)/10
        people.append(Person(cluster_x+shift_x,cluster_y+shift_y))
    
        
fig = plt.figure()
fig.set_size_inches(10,10)
plt.grid(True)

ani = animation.FuncAnimation(fig,animate,interval=300)
plt.show()