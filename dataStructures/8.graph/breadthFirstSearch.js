// breadthFirstSearch广度优先搜索
import { Queue } from "../2.queue/queue.js";

// 初始化各个顶点状态
const initializeVertexState = (vertices) => {
  let vertexState = {};
  for (let i = 0; i < vertices.length; i++) {
    vertexState[vertices[i]] = 0;
  }
  return vertexState;
};

// 广度优先搜索
export let breadthFirstSearch = (graph, startVertex, callback) => {
  //startVertex入口节点名称
  let vertices = graph.getVertices(); //获取所有顶点
  let adjList = graph.getAdjList(); //各个顶点的相邻顶点列表（是一个字典）
  let vertexState = initializeVertexState(vertices);

  let queue = new Queue();
  queue.enqueue(startVertex);
  vertexState[startVertex] = 1;

  // 开始遍历
  while (!queue.isEmpty()) {
    let u = queue.dequeue();
    let neighbors = adjList.get(u); //获取节点u的相邻节点列表
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (vertexState[w] === 0) {
        //未方位过的节点谈价到队列中，并状态置为已被访问1
        queue.enqueue(w);
        vertexState[w] = 1;
      }
    }
    vertexState[u] = 2; //表示该节点已经探索完毕2
    if (callback) {
      callback(u);
    }
  }
};

// 使用BFC寻找各个节点具体源节点的最短路径
export let BFSMinDistance = (graph, vertex) => {
  let vertices = graph.getVertices(); //获取所有顶点
  let adjList = graph.getAdjList(); //各个顶点的相邻顶点列表（是一个字典）
  let vertexState = initializeVertexState(vertices);

  let queue = new Queue();
  queue.enqueue(vertex);
  vertexState[vertex] = 1;
  let distance = {};
  let predecessors = {}; //各个节点到源节点的前溯点

  for (let i = 0; i < vertices.length; i++) {
    distance[vertices[i]] = 0; //初始化各个节点的距离
    predecessors[vertices[i]] = null; //初始化各个节点到源节点的前溯点为null
  }
  // 开始遍历
  while (!queue.isEmpty()) {
    let u = queue.dequeue();
    let neighbors = adjList.get(u); //获取节点u的相邻节点列表
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (vertexState[w] === 0) {
        //未方位过的节点谈价到队列中，并状态置为已被访问1
        queue.enqueue(w);
        distance[w] = distance[u] + 1;
        predecessors[w] =   u;
        vertexState[w] = 1;
      }
    }
    vertexState[u] = 2; //表示该节点已经探索完毕2
  }
  return {
    distance,
    predecessors
  };
};
