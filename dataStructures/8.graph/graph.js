
import {Dictionary} from '../5.dictionary&hashTable/dictionary.js'

//  图类
export class Graph{
    constructor(isDirected=false){
        this.isDirected = isDirected;
        this.vertices = []//存储节点名字
        this.adjList = new Dictionary()//作为邻接表，顶点为键，相邻节点列表为值
    }

    // 添加节点
    addVertex(v){
        if(!this.vertices.includes(v)){
            this.vertices.push(v);
            this.adjList.set(v,[]);
        }
    }

    // 添加边，接收两个顶点作为参数
    addEdge(v,w){
        if(!this.adjList.get(v)){
            this.addVertex(v)
        }
        if(!this.adjList.get(w)){
            this.addVertex(w)
        }
        this.adjList.get(v).push(w)
        // 无向图，需再加一个
        if(!this.isDirected){
            this.adjList.get(w).push(v)
        }
    }

    getVertices(){
        return this.vertices
    }

    getAdjList(){
        return this.adjList
    }

    toString(){
        let objString = ''
        for (const vertex of this.vertices) {
            let edgeList = this.adjList.get(vertex)  
            objString+=`${vertex} -> `;
            for (let i = 0; i < edgeList.length; i++) {
                objString += `${edgeList[i]} `
            } 
            objString+='\n'
        }
        return objString
    }
 }