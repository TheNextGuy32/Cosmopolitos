import matplotlib.pyplot as plt
import numpy as np
import math
import time
import matplotlib.animation as animation

np.random.seed()

culture_limit = 1.0
distance = culture_limit * 0.8
number_clusters = 10
number_per_cluster = 3
spread = False

worldliness_max = 1

radian_shock = True
magnitude_shock = True

north_color = (1,1,0)
east_color = (1,0.5,0)
south_color = (0.545/255,0.1254,0.73)
west_color = (0,0.7,0.83921)

people = list()

max_size = 5000
alph = .95
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
        if(self.worldliness >worldliness_max):
            self.worldliness = worldliness_max
        elif(self.worldliness <0):
            self.worldliness = 0
            
        self.size = max_size *  (0.1 + (0.9 * self.worldliness/worldliness_max))
        
        
        while(self.x>culture_limit): 
            self.x = self.x-culture_limit
        while(self.x<-culture_limit): 
            self.x =self.x+culture_limit
        while(self.y>culture_limit): 
            self.y =self.y-culture_limit
        while(self.y<-culture_limit): 
            self.y =self.y+culture_limit
        
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
    
    a_angle = math.atan2(a.y,a.x)
    b_angle = math.atan2(b.y,b.x)
      
   
    if(magnitude_shock):
        value = 50.0
        movement_value = 10.0
        if(distance > (culture_limit*2) * 0.8):
            #Shockingly different
            #if ^^ distance  
            #  worldliness vv  
            #  go away from centre barely
            #  go away from one another greatly
            a.worldliness = a.worldliness-(2/movement_value)
            b.worldliness = b.worldliness-(2/movement_value)
            
            a_magnitude= a_magnitude+(1/value)
            b_magnitude= a_magnitude+(1/value)
            
        elif(distance > (culture_limit*2) * 0.5):
            #You learn a great deal from this person
            #if ^  distance
            #  worldliness ^^
            #  go towards centre greatly
            #  go away from one another slightly
            
            a.worldliness = a.worldliness+(2/movement_value)
            b.worldliness = b.worldliness+(2/movement_value)
            
            a_magnitude= a_magnitude-(2/value)
            b_magnitude= a_magnitude-(2/value)
            
        elif(distance > (culture_limit*2) * 0.20):
            #You learn a bit from this person
            #if v  distance
            #  worldliness v   
            #  go towards centre barely
            #  go towards one another slightly
            
            a.worldliness = a.worldliness-(1/movement_value)
            b.worldliness = b.worldliness-(1/movement_value)
            
            a_magnitude= a_magnitude-(1/value)
            b_magnitude= a_magnitude-(1/value)
            
        else:
            #Someone very close to you, you isolate yourselves
            #if vv 
            #  distance  worldliness
            #  go away from centre greatly
            #  go towards one another greatly
             
            a.worldliness = a.worldliness+(1/movement_value)
            b.worldliness = b.worldliness+(1/movement_value)
            
            a_magnitude= a_magnitude+(2/value)
            b_magnitude= a_magnitude+(2/value)
        
    #in any case move their angles closer together
    if(radian_shock):
        amount = (2*math.pi)/360
        if(a_angle>b_angle):
            if((2*math.pi) - a_angle + b_angle < a_angle-b_angle):
                a_angle = a_angle + amount
                b_angle = b_angle - amount
            else:
                a_angle = a_angle - amount
                b_angle = b_angle + amount
        else:
            if((2*math.pi) - b_angle + a_angle < b_angle-a_angle):
                b_angle = b_angle + amount
                a_angle = a_angle - amount
            else:
                b_angle = b_angle - amount
                a_angle = a_angle + amount
    
    #Update new positions     
    a.x = math.cos(a_angle) * a_magnitude
    a.y = math.sin(a_angle) * a_magnitude
    
    b.x = math.cos(b_angle) * b_magnitude
    b.y = math.sin(b_angle) * b_magnitude  

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
starting_angle = np.random.random_sample() * (2*math.pi)
if(number_clusters!=0 and number_per_cluster != 0):
    for c in range(0, number_clusters):
        angle = starting_angle + ((2 * math.pi) / number_clusters * c)
        
        cluster_x = math.cos(angle) * distance
        cluster_y = math.sin(angle) * distance
        
        for n in range(0,number_per_cluster):
            shift_x = 0
            shift_y = 0
            if(spread):
                shift_x = ((np.random.random_sample()*2)-1)/10
                shift_y = ((np.random.random_sample()*2)-1)/10
            people.append(Person(cluster_x+shift_x,cluster_y+shift_y))
else:
    import sys
    sys.exit()
    
        
fig = plt.figure(figsize=(8,8))
fig.set_size_inches(10,10)
plt.grid(True)

ani = animation.FuncAnimation(fig,animate,interval=5)
plt.show()
