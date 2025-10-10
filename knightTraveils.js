function knightTraveils(startPos, endPos){
    if(isValidPos(startPos) && isValidPos(endPos)){
        let queue = []
        let paths = []
        let visited = {}
        queue.push(startPos)
        while(queue.length>0){
            let firstNode = queue[0]
            let nextPos = possibleNextPos(firstNode, endPos, visited)
            for(const pos of nextPos){
                queue.push(pos)
            }
            let [found, path] = buildPaths(paths, firstNode, endPos, nextPos, visited)
            if(found){
                console.log(`You made it in ${path.length} moves! Here's your path:`)
                for(const move of path){
                    console.log(`[${move.toString()}]`);   
                }
                return
            }
            queue.shift()
        }
    }else{
        return null
    }
   
}

function buildPaths(paths, startPos, endPos, nextPos, visited){
        
        if(paths.length==0){
            visited[startPos.toString()]= startPos
            for(const pos of nextPos){
                paths.push([startPos, pos])
                visited[pos.toString()] = pos
                if(nextPos[0]==endPos[0] && nextPos[1]==endPos[1] ){
                    return [true, [startPos, nextPos]]
                }
            }  
            return [false, null]
        }else{
            let addedPaths = []
            for(let i=0;i<paths.length;i++){
                let currPath = paths[i]
                let lastCurr = currPath[currPath.length-1]
                if(lastCurr[0]==startPos[0] && lastCurr[1]==startPos[1]){
                    for (const pos of nextPos) {
                        
                        visited[pos.toString()] = pos
                        if(pos[0]==endPos[0] && pos[1]==endPos[1]){
                            return [true, [...currPath, pos]]
                        }else{
                            addedPaths.push([...currPath, pos])
                        }
                    }
                    paths.splice(i,1,...addedPaths)
                    return [false,null]
                }
            }

        }
    }



function possibleNextPos(startPos, endPos, visited){
    let positions = [[startPos[0]+1,startPos[1]-2],
                 [startPos[0]+2, startPos[1]-1],
                 [startPos[0]+2, startPos[1]+1],
                 [startPos[0]+1, startPos[1]+2],
                 [startPos[0]-1, startPos[1]+2],
                 [startPos[0]-2, startPos[1]+1],
                 [startPos[0]-2, startPos[1]-1],
                 [startPos[0]-1, startPos[1]-2]
                ]
    
    let filteredPos = []
    let endPresent = false
    for(const pos of positions){

        if(pos[0]==endPos[0] && pos[1] == endPos[1]){
            endPresent = true
        }
        else if(isValidPos(pos) && !visited[pos.toString()])
        {
            filteredPos.push(pos)  
        }
    }

    if(endPresent){
        return [endPos, ...filteredPos]
    }else{
        return filteredPos
    }
    
}

function isValidPos(pos){
    return (pos[0]>=0 && pos[0]<=7) && (pos[1]>=0 && pos[1]<=7)    
}

knightTraveils([0,0],[3,3])
knightTraveils([3,3],[0,0])
knightTraveils([0,0],[7,7])
knightTraveils([3,3],[4,3])
