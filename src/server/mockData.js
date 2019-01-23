const mockData = {
  services: [
    {
      name: "backend-cluster-ip-service",
      type: "ClusterIP",
      clusterIP: "10.27.241.73",
      createdAt: "2019-01-09T17:56:26Z",
      selector: { component: "server" },
      ports: [{ protocol: "TCP", port: 8001, targetPort: 8001 }],
      status: null
    },
    {
      name: "client-cluster-ip",
      type: "ClusterIP",
      clusterIP: "10.27.255.145",
      createdAt: "2019-01-09T17:56:27Z",
      selector: { component: "web" },
      ports: [{ protocol: "TCP", port: 8002, targetPort: 8002 }],
      status: null
    },
    {
      name: "kubernetes",
      type: "ClusterIP",
      clusterIP: "10.27.240.1",
      createdAt: "2019-01-09T03:32:06Z",
      ports: [{ name: "https", protocol: "TCP", port: 443, targetPort: 443 }],
      labels: { component: "apiserver", provider: "kubernetes" },
      status: null
    },
    {
      name: "my-nginx-nginx-ingress-controller",
      type: "LoadBalancer",
      clusterIP: "10.27.244.167",
      createdAt: "2019-01-09T17:47:31Z",
      selector: {
        app: "nginx-ingress",
        component: "controller",
        release: "my-nginx"
      },
      ports: [
        {
          name: "http",
          protocol: "TCP",
          port: 80,
          targetPort: "http",
          nodePort: 30194
        },
        {
          name: "https",
          protocol: "TCP",
          port: 443,
          targetPort: "https",
          nodePort: 31726
        }
      ],
      labels: {
        app: "nginx-ingress",
        chart: "nginx-ingress-1.1.3",
        component: "controller",
        heritage: "Tiller",
        release: "my-nginx"
      },
      status: { ingress: [{ ip: "34.73.72.63" }] }
    },
    {
      name: "my-nginx-nginx-ingress-default-backend",
      type: "ClusterIP",
      clusterIP: "10.27.244.29",
      createdAt: "2019-01-09T17:47:31Z",
      selector: {
        app: "nginx-ingress",
        component: "default-backend",
        release: "my-nginx"
      },
      ports: [{ name: "http", protocol: "TCP", port: 80, targetPort: "http" }],
      labels: {
        app: "nginx-ingress",
        chart: "nginx-ingress-1.1.3",
        component: "default-backend",
        heritage: "Tiller",
        release: "my-nginx"
      },
      status: null
    }
  ],
  pods: [
    {
      name: "backend-deployment-cbf646b58-dtnzf",
      labels: { component: "server", "pod-template-hash": "769202614" },
      containers: [
        {
          containerName: "server",
          imageName: "bbbryan14/amanda:backend",
          mappedContainerPort: [{ containerPort: 8001, protocol: "TCP" }],
          env: [
            {
              name: "PGHOST",
              value: "claralee.cwmnfa9m9b54.us-east-2.rds.amazonaws.com"
            },
            { name: "PGUSER", value: "denzel" },
            { name: "PGPORT", value: "8080" },
            { name: "PGDATABASE", value: "Amanda" },
            { name: "PGPASSWORD", value: "manonfire" }
          ]
        }
      ],
      listOfVolumes: ["default-token-btkgk"],
      createdAt: "2019-01-10T17:18:33Z",
      nodeName: "gke-kubricks-default-pool-b055752b-7nsz",
      status: {
        currentStatus: "Running",
        podIP: "10.24.1.13",
        initialized: {
          Initialized: "True",
          Ready: "True",
          PodScheduled: "True"
        },
        podStartTime: "2019-01-10T17:18:33Z",
        containerStatus: [
          { containerName: "server", ready: true, restartCount: 0 }
        ]
      }
    },
    {
      name: "client-deployment-5fd8df4688-7tptw",
      labels: { component: "web", "pod-template-hash": "1984890244" },
      containers: [
        {
          containerName: "client",
          imageName: "bbbryan14/amanda:client",
          mappedContainerPort: [{ containerPort: 8002, protocol: "TCP" }]
        }
      ],
      listOfVolumes: ["default-token-btkgk"],
      createdAt: "2019-01-10T17:18:34Z",
      nodeName: "gke-kubricks-default-pool-b055752b-wb5z",
      status: {
        currentStatus: "Running",
        podIP: "10.24.0.9",
        initialized: {
          Initialized: "True",
          Ready: "True",
          PodScheduled: "True"
        },
        podStartTime: "2019-01-10T17:18:34Z",
        containerStatus: [
          { containerName: "client", ready: true, restartCount: 0 }
        ]
      }
    },
    {
      name: "client-deployment-5fd8df4688-kcsf8",
      labels: { component: "web", "pod-template-hash": "1984890244" },
      containers: [
        {
          containerName: "client",
          imageName: "bbbryan14/amanda:client",
          mappedContainerPort: [{ containerPort: 8002, protocol: "TCP" }]
        }
      ],
      listOfVolumes: ["default-token-btkgk"],
      createdAt: "2019-01-10T17:18:34Z",
      nodeName: "gke-kubricks-default-pool-b055752b-59t9",
      status: {
        currentStatus: "Running",
        podIP: "10.24.2.11",
        initialized: {
          Initialized: "True",
          Ready: "True",
          PodScheduled: "True"
        },
        podStartTime: "2019-01-10T17:18:34Z",
        containerStatus: [
          { containerName: "client", ready: true, restartCount: 0 }
        ]
      }
    },
    {
      name: "client-deployment-5fd8df4688-mswtp",
      labels: { component: "web", "pod-template-hash": "1984890244" },
      containers: [
        {
          containerName: "client",
          imageName: "bbbryan14/amanda:client",
          mappedContainerPort: [{ containerPort: 8002, protocol: "TCP" }]
        }
      ],
      listOfVolumes: ["default-token-btkgk"],
      createdAt: "2019-01-10T17:18:34Z",
      nodeName: "gke-kubricks-default-pool-b055752b-7nsz",
      status: {
        currentStatus: "Running",
        podIP: "10.24.1.14",
        initialized: {
          Initialized: "True",
          Ready: "True",
          PodScheduled: "True"
        },
        podStartTime: "2019-01-10T17:18:34Z",
        containerStatus: [
          { containerName: "client", ready: true, restartCount: 0 }
        ]
      }
    },
    {
      name: "client-deployment-5fd8df4688-xcsnz",
      labels: { component: "web", "pod-template-hash": "1984890244" },
      containers: [
        {
          containerName: "client",
          imageName: "bbbryan14/amanda:client",
          mappedContainerPort: [{ containerPort: 8002, protocol: "TCP" }]
        }
      ],
      listOfVolumes: ["default-token-btkgk"],
      createdAt: "2019-01-12T23:44:29Z",
      nodeName: "gke-kubricks-default-pool-b055752b-59t9",
      status: {
        currentStatus: "Running",
        podIP: "10.24.2.12",
        initialized: {
          Initialized: "True",
          Ready: "True",
          PodScheduled: "True"
        },
        podStartTime: "2019-01-12T23:44:29Z",
        containerStatus: [
          { containerName: "client", ready: true, restartCount: 0 }
        ]
      }
    },
    {
      name: "client-deployment-5fd8df4688-zpg4j",
      labels: { component: "web", "pod-template-hash": "1984890244" },
      containers: [
        {
          containerName: "client",
          imageName: "bbbryan14/amanda:client",
          mappedContainerPort: [{ containerPort: 8002, protocol: "TCP" }]
        }
      ],
      listOfVolumes: ["default-token-btkgk"],
      createdAt: "2019-01-12T23:44:29Z",
      nodeName: "gke-kubricks-default-pool-b055752b-wb5z",
      status: {
        currentStatus: "Running",
        podIP: "10.24.0.10",
        initialized: {
          Initialized: "True",
          Ready: "True",
          PodScheduled: "True"
        },
        podStartTime: "2019-01-12T23:44:29Z",
        containerStatus: [
          { containerName: "client", ready: true, restartCount: 0 }
        ]
      }
    },
    {
      name: "my-nginx-nginx-ingress-controller-6fc5884d6f-frrwz",
      labels: {
        app: "nginx-ingress",
        component: "controller",
        "pod-template-hash": "2971440829",
        release: "my-nginx"
      },
      containers: [
        {
          containerName: "nginx-ingress-controller",
          imageName:
            "quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.21.0",
          mappedContainerPort: [
            { name: "http", containerPort: 80, protocol: "TCP" },
            { name: "https", containerPort: 443, protocol: "TCP" }
          ],
          env: [
            {
              name: "POD_NAME",
              valueFrom: {
                fieldRef: { apiVersion: "v1", fieldPath: "metadata.name" }
              }
            },
            {
              name: "POD_NAMESPACE",
              valueFrom: {
                fieldRef: { apiVersion: "v1", fieldPath: "metadata.namespace" }
              }
            }
          ]
        }
      ],
      listOfVolumes: ["my-nginx-nginx-ingress-token-87pwt"],
      createdAt: "2019-01-09T17:47:31Z",
      nodeName: "gke-kubricks-default-pool-b055752b-7nsz",
      status: {
        currentStatus: "Running",
        podIP: "10.24.1.8",
        initialized: {
          Initialized: "True",
          Ready: "True",
          PodScheduled: "True"
        },
        podStartTime: "2019-01-09T17:47:31Z",
        containerStatus: [
          {
            containerName: "nginx-ingress-controller",
            ready: true,
            restartCount: 0
          }
        ]
      }
    },
    {
      name: "my-nginx-nginx-ingress-default-backend-6946f9777c-ng6bd",
      labels: {
        app: "nginx-ingress",
        component: "default-backend",
        "pod-template-hash": "2502953337",
        release: "my-nginx"
      },
      containers: [
        {
          containerName: "nginx-ingress-default-backend",
          imageName: "k8s.gcr.io/defaultbackend:1.4",
          mappedContainerPort: [
            { name: "http", containerPort: 8080, protocol: "TCP" }
          ]
        }
      ],
      listOfVolumes: ["default-token-btkgk"],
      createdAt: "2019-01-09T17:47:31Z",
      nodeName: "gke-kubricks-default-pool-b055752b-7nsz",
      status: {
        currentStatus: "Running",
        podIP: "10.24.1.7",
        initialized: {
          Initialized: "True",
          Ready: "True",
          PodScheduled: "True"
        },
        podStartTime: "2019-01-09T17:47:31Z",
        containerStatus: [
          {
            containerName: "nginx-ingress-default-backend",
            ready: true,
            restartCount: 0
          }
        ]
      }
    }
  ]
};
