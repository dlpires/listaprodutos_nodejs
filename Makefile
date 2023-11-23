#TO RUN: make build version=DOCKER_IMAGE_TAG
build: $(eval SHELL:=/bin/bash)
	@echo "### START BUILD! ###";
	@docker build -t dlpires300/listaprodutos_nodejs:$(version) .
	@docker tag dlpires300/listaprodutos_nodejs:$(version) dlpires300/listaprodutos_nodejs:latest
	@docker tag dlpires300/listaprodutos_nodejs:$(version) registry.digitalocean.com/dlpires300/listaprodutos_nodejs:$(version)
	@docker tag dlpires300/listaprodutos_nodejs:$(version) registry.digitalocean.com/dlpires300/listaprodutos_nodejs:latest
	@docker push dlpires300/listaprodutos_nodejs:$(version)
	@docker push dlpires300/listaprodutos_nodejs:latest
	@docker push registry.digitalocean.com/dlpires300/listaprodutos_nodejs:$(version)
	@docker push registry.digitalocean.com/dlpires300/listaprodutos_nodejs:latest
	@echo "### DONE! ###";
