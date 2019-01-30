# Kubricks [logo] [screenshot]

#What is it
Kubricks is an Electron App designed to provide intuitive graphs of current cluster deployment to engineers. 
  - Visualize cluster resources and their relationships 
  - Condtionally render resources to highlight errors

#How it works
Kubricks queries Kubernetes apiserver using the Kubernetes Javascript Client library using the context of kubectl config current-context.

#Prerequisites 
  - Must have a Kubernetes cluster deployed
  - Configured kubectl to the right context, i.e. GKE, Minikube

#IMPORTANT
Kubricks is currently in beta release. Please do not rely on this product to troubleshoot your deployment errors. It is very important to cross check information being displayed to information from kubeclt describe. 

#Navigating The App
##Cluster View
Cluster View mirrors the way kublet interacts with resources that are hosted on specific nodes. This view is primarily to display pods that are hosted on a particular node. Additionally, persistent volumes that are part of a pod's configuration are also rendered.  

##Traffic View
Traffic View mirrors the way kube-proxy directs incoming requests to different pods through services. This view is to render services with selected pods, and to highlight port mapping errors. 

#Set Up
  - go to kubricks.io and download the installer

#Contributing
Kubricks is currenty in beta release. There is still a long way to being a polished tool. Please make pull requests to help us 
