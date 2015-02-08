cd ..
printf 'cd to' && pwd
echo 'Cloning BeagleLab/beagle-style'
git clone git@github.com:BeagleLab/beagle-style.git
cd beagle-style 
echo 'Installing modules...'
npm install
cd ..
echo 'Cloning BeagleLab/beagle-pdf'
git clone git@github.com:BeagleLab/beagle-pdf.git
cd beagle-pdf
echo 'Installing modules...'
npm install 
echo 'Set up symlinks...'
cd ../beagle/node_modules
printf 'cd to' && pwd
ln -s ../../beagle-style
ln -s ../../beagle-pdf