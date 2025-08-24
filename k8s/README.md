# 🚀 Microservices Kubernetes Deployment

This directory contains all the necessary Kubernetes manifests and scripts to deploy the ShopMate microservices application to Kubernetes.

## 📁 File Structure

```
k8s/
├── namespace.yaml          # Kubernetes namespace
├── configmap.yaml          # Configuration values
├── secret.yaml             # Sensitive data (base64 encoded)
├── kafka.yaml              # Kafka deployment and service
├── mongodb.yaml            # MongoDB deployment, service, and PVC
├── login-service.yaml      # Login service deployment and service
├── payment-service.yaml    # Payment service deployment and service
├── order-service.yaml      # Order service deployment and service
├── email-service.yaml      # Email service deployment and service
├── analytics-service.yaml  # Analytics service deployment and service
├── frontend.yaml           # Frontend deployment and service
├── kafka-ui.yaml          # Kafka UI deployment and service
├── ingress.yaml            # Ingress resource for external access
├── deploy.sh               # Deployment script
├── cleanup.sh              # Cleanup script
└── README.md               # This file
```

## 🏗️ Architecture

The application consists of:

- **Frontend**: Next.js application (client2)
- **Login Service**: User authentication service
- **Payment Service**: Payment processing service
- **Order Service**: Order management service (consumes from Kafka)
- **Email Service**: Email notification service (consumes from Kafka)
- **Analytics Service**: Analytics and dashboard service (consumes from Kafka)
- **Kafka**: Message broker for inter-service communication
- **MongoDB**: Database for order storage
- **Kafka UI**: Web interface for Kafka management

## 🚀 Quick Start

### Prerequisites

1. **Kubernetes Cluster**: A running Kubernetes cluster (local or remote)
2. **kubectl**: Kubernetes command-line tool
3. **Docker**: For building container images
4. **NGINX Ingress Controller**: For external access (optional)

### 1. Build and Deploy

```bash
# Make scripts executable (if not already done)
chmod +x k8s/deploy.sh k8s/cleanup.sh

# Deploy everything
./k8s/deploy.sh
```

### 2. Access Services

After deployment, you can access services using port-forward:

```bash
# Frontend
kubectl port-forward -n microservices service/frontend-service 3000:3000

# Kafka UI
kubectl port-forward -n microservices service/kafka-ui-service 9090:8080

# Individual services
kubectl port-forward -n microservices service/login-service 7001:7001
kubectl port-forward -n microservices service/payment-service 8001:8001
kubectl port-forward -n microservices service/analytics-service 8000:8000
```

### 3. Cleanup

```bash
# Remove all resources
./k8s/cleanup.sh
```

## 🔧 Configuration

### Environment Variables

The services are configured using ConfigMaps and Secrets:

- **ConfigMap**: Contains non-sensitive configuration
- **Secret**: Contains sensitive data (base64 encoded)

### Service Discovery

Services communicate using Kubernetes service names:
- `kafka-service:9092` for Kafka
- `mongodb-service:27017` for MongoDB
- `login-service:7001` for login service
- etc.

## 📊 Monitoring and Health Checks

All services include:
- **Liveness Probes**: Restart containers if they become unresponsive
- **Readiness Probes**: Only send traffic when containers are ready
- **Resource Limits**: CPU and memory constraints
- **Health Endpoints**: HTTP endpoints for health monitoring

## 🔒 Security Features

- **Non-root Users**: All containers run as non-root users
- **Secrets Management**: Sensitive data stored in Kubernetes secrets
- **Network Policies**: Services isolated in dedicated namespace
- **Resource Limits**: Prevents resource exhaustion

## 🚨 Troubleshooting

### Common Issues

1. **Image Pull Errors**: Ensure Docker images are built locally
2. **Port Conflicts**: Check if ports are already in use
3. **Resource Limits**: Monitor pod resource usage
4. **Service Connectivity**: Verify service names and ports

### Debugging Commands

```bash
# Check pod status
kubectl get pods -n microservices

# View pod logs
kubectl logs -n microservices <pod-name>

# Describe resources
kubectl describe -n microservices <resource-type> <resource-name>

# Access pod shell
kubectl exec -it -n microservices <pod-name> -- /bin/sh
```

### Logs and Monitoring

```bash
# View all logs
kubectl logs -n microservices -l app=login-service

# Follow logs
kubectl logs -n microservices -f <pod-name>

# Check service endpoints
kubectl get endpoints -n microservices
```

## 🔄 Scaling

### Horizontal Pod Autoscaling

To enable automatic scaling, add HPA resources:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: login-service-hpa
  namespace: microservices
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: login-service
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
```

### Manual Scaling

```bash
# Scale login service to 5 replicas
kubectl scale deployment login-service -n microservices --replicas=5
```

## 🌐 External Access

### LoadBalancer Service

The frontend service includes a LoadBalancer for external access:

```bash
# Get external IP
kubectl get service frontend-ingress -n microservices
```

### Ingress Controller

For more advanced routing, use the provided Ingress resource:

```bash
# Apply ingress
kubectl apply -f k8s/ingress.yaml

# Check ingress status
kubectl get ingress -n microservices
```

## 📈 Production Considerations

1. **Persistent Storage**: Use appropriate storage classes for production
2. **Resource Limits**: Adjust based on actual usage patterns
3. **Security**: Implement proper RBAC and network policies
4. **Monitoring**: Add Prometheus and Grafana for metrics
5. **Logging**: Implement centralized logging (ELK stack)
6. **Backup**: Regular backups of MongoDB data
7. **SSL/TLS**: Enable HTTPS for production

## 🤝 Contributing

When adding new services:

1. Create a Dockerfile in the service directory
2. Add Kubernetes manifests in the `k8s/` directory
3. Update the deployment script
4. Test locally before committing

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Kafka Documentation](https://kafka.apache.org/documentation/)
- [MongoDB Documentation](https://docs.mongodb.com/)
