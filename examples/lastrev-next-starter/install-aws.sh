curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -q awscliv2.zip
mkdir aws-home
./aws/install -i ~/aws-home -b /opt/buildhome/.binrc/bin