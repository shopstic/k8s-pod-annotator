# k8s-env-injector
The purpose of k8s-env-injector is to inject node labels as environment variables to pods in a selected namespace.

## Local development

Enter shell with `./shell.sh` and then watch for changes with `./cli.sh watch`.

## Deployment

Helm chart is provided in `charts` directory.

### Generating certificates
Kubernetes requires admission webhooks to be accessible through https.

Script `certs.sh` contains helper method for generating certificates that will be ready to use in Helm chart (remember to review the script before actually using those certificates in your cluster):

```shell
> export ENV_INJECTOR_SERVICE_NAME="env-injector"
> export ENV_INJECTOR_SERVICE_NAME="namespace-where-env-injector-will-be-deployed-to"
> export ENV_INJECTOR_CERT_VALIDITY_DAYS="365"
> ./certs.sh generate_cert
```

It will generate three files: `key.pem`, `cert.pem` and `private.crt`.

### Using Helm chart

Helm chart is provided in `charts` directory. 
Values that always need to be specified:
- `mutationWebhook.namespaceSelector`. It should select only the namespace where k8s-env-injector is deployed to.
- `mutationWebhook.certificate.cert` - base64 encoded `cert.pem` from the previous step.
- `mutationWebhook.certificate.key` - base64 encoded `key.pem` from the previous step.