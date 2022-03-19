import  {Node,BinarySearchTree} from "./binarySearchTree.js";
import { Compare, defaultCompare } from "../../utils/index.js";

export default class AVLTree extends BinarySearchTree{
    constructor(compareFn = defaultCompare){
        super(compareFn);
    }

    getNodeHeight(node){
        if(node == null){
            return -1
        }
        return Math.max(this.getNodeHeight(node.left),this.getNodeHeight(node.right)) +1
    }

    getBalanceFactor(node){
        return this.getNodeHeight(node.right)-this.getNodeHeight(node.left)
    }

    // LL用右旋操作
    rotationLL(node){
        let leftNode = node.left; 
        node.left = leftNode.right
        leftNode.right = node;
        return leftNode;//返回该子树现在的根节点
    }

    // RR用左旋操作
    rotationRR(node){
        let rightNode = node.right;
        node.right = rightNode.left
        rightNode.left = node;
        return rightNode
    }

    rotationLR(node){
        // 先对左侧子节点进行左旋操作
        node.left = this.rotationRR(node.left)
        return this.rotationLL(node)
    }

    rotationRL(node){
        // 先对右侧子节点进行右旋操作
        node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }

    insert(key){
        this.root = this.insertNode(this.root,key)
    }
    insertNode(node,key){
        if(node == null){
            return node = new Node(key)
        }
        if(this.compareFn(key,node.key) === Compare.LESS_THAN){
            // 向左侧插入
            node.left =  this.insertNode(node.left,key)
        }else if(this.compareFn(key,node.key) === Compare.BIGGER_THAN ){
            // 右侧插入
            node.right = this.insertNode(node.right,key)
        }
        // 树原本是平衡的，插入元素之后，变得不平衡，那么哪侧高度高，新元素就是插入到了哪一侧
        // 此操作是在某个子树变得不平衡之后马上进行的，也就是从下往上的，最后调整根节点
        let balanceFactor = this.getBalanceFactor(node);
        if(balanceFactor === 2){
            // 右侧高，新元素插入到了右侧
            if(this.compareFn(key,node.right) === Compare.LESS_THAN){
                //新节点键值小于右侧子节点键值，那么他是RL
                node = this.rotationRL(node)    
            }else{
                //新节点键值大于右侧子节点键值，那么他是RR
                node = this.rotationRR(node)    
            }
        }else if(balanceFactor === -2){
            // 左侧高，新元素插入到了左侧
            if(this.compareFn(key,node.left) === Compare.LESS_THAN){
                // 新节点键值小于左侧子节点键值，那么他是LL
                node = this.rotationLL(node) 
            }else{
                // 新节点键值大于左侧子节点键值，那么他是LR
                node = this.rotationLR(node) 
            }
        }
        return node;
    }

    removeNode(node,key){
        node = super.removeNode(node,key);
        if(node == null){
            return node;
        }

        // 树原本是平衡的，删除元素之后，变得不平衡，哪侧高，元素是从另一侧删除的
        // 此操作是在某个子树变得不平衡之后马上进行的，也就是从下往上的，最后调整根节点
        let balanceFactor = this.getBalanceFactor(node);
        if(balanceFactor === 2){
            // 右侧高，元素从左侧删除的，右侧不平衡
            let balanceFactorRight = this.getBalanceFactor(node.right);
            if(balanceFactorRight===0||balanceFactorRight===1){
                // 右右 RR
                node = this.rotationRR(node)
            }else if(balanceFactorRight === -1){
                // 右左 RL
                node = this.rotationRL(node)
            }
        }else if(balanceFactor === -2){
            // 左侧高，元素从右侧删除的，左侧不平衡
            let balanceFactorLeft = this.getBalanceFactor(node.left);
            if(balanceFactorLeft===0||balanceFactorLeft===1){
                // 左右 LR
                node = this.rotationLR(node)
            }else if(balanceFactorLeft === -1){
                // 左左 RL
                node = this.rotationLL(node)
            }
        }
        return node
    }

}