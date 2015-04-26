cd ..
printf 'cd to' && pwd
echo 'Cloning BeagleLab/beagle-style'
git clone git@github.com:BeagleLab/beagle-style.git
cd beagle-style
echo 'Installing modules...'
npm install
echo 'Set up symlinks...'
cd ../beagle/node_modules
printf 'cd to' && pwd
ln -s ../../beagle-style
