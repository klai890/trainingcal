# Training Calendar

A local, subpar imitation of TrianingPeaks. Very simple, runs off of a local JSON file.

## Setup
1. Clone the repository:
   ```
   git clone https://github.com/klai890/trainingcal.git
   ```
3. Create the data folder and file, which will be used as a rudimentary database to store all your workouts.

   ```
   cd trainingcal && ./setup/setup.sh
   ```

   About the script: Note that the script `setup.sh` must be called from the root of project directory
   The script creates `/data/data.json`
5. Setup the Nextjs site:
   ```
   cd site
   yarn install
   yarn run dev
   ```
   
Good to go!
