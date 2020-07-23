# Optimized build
```bash
    #!/usr/bin/env bash
    cd /path/to/front
    
    echo "/services/front installing ..."
    npm install
    npm rebuild node-sass
    npm run build
```