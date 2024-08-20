# Use an official Ubuntu as a base image
FROM ubuntu:20.04

# Install Node.js 18 LTS (Hydrogen) and OCI CLI
RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    python3-venv \
    python3-pip \
    gnupg2 \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install OCI CLI
RUN curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh -o install.sh \
    && chmod +x install.sh \
    && ./install.sh --accept-all-defaults \
    && rm install.sh

# Set environment variables
ENV PATH="/root/bin:${PATH}"

# Set OCI CLI configuration directory
RUN mkdir -p /root/.oci

# Work directory
WORKDIR /app

CMD ["bash"]
