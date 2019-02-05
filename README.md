<p align="center">
  <img width="220" height="220" src="https://raw.githubusercontent.com/th9061/Kubricks/master/build/background.png">
</p>
<h1 align="center"> Kubricks (Alpha) </h1>

**Kubricks is currently in an alpha release stage. Please do not rely solely on this product to troubleshoot your deployment. It is very important to cross check information being displayed to information from `kubectl describe`.**

## What is it?

Kubricks is an Electron App designed to provide intuitive graphs of current cluster deployment to engineers. It allows us to: 
  - Visualize cluster resources and their relationships 
  - Condtionally render resources to highlight errors
#### Prerequisites 
In order to properly utilize the Kubricks app, a few conditions have to be met. You should have:
  - A Kubernetes cluster deployed
  - Configured kubectl to the right context (i.e. GKE, Minikube)

## How it works
Kubricks queries Kubernetes apiserver through the Kubernetes Javascript Client library, using the context of `kubectl config current-context`.

## Installation
  - If would like to give Kubricks a try, please visit kubricks.io and download the installer for your operating system.

# Navigating The App
___
### Cluster View
Cluster View mirrors the way kublet interacts with resources that are hosted on specific nodes. This view is primarily to display pods that are hosted on a particular node. Additionally, persistent volumes that are part of a pod's configuration are also rendered.  

### Traffic View
Traffic View mirrors the way kube-proxy directs incoming requests to different pods through services. This view is to render services with selected pods, and to highlight port mapping errors.

#### Contributing
Kubricks is currenty in alpha release. We are still testing, adding features, and polishing the app. We welcome any feedback!

The MIT License

Copyright (c) 2010-2018 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
