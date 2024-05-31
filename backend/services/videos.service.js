let Videos =require("../models/videos.model");
let {contentRatings} =require("../utils/values");
let getAll=async(title,contentRating,genres,sortBy)=>{

    let titleMatcher={title:{$regex:title,$options:'i'}};
    
    let contentRatingArr=getPossibleContentRating(contentRating);
    let contentRatingMatcher={contentRating:{$in:contentRatingArr}};
   // let genreList=genres.split(" ");
    //console.log(genreList);
    let genreMatcher={genre:{$in:genres}};
    if(genres.includes("All"))
    {
        genreMatcher=null;
    }
   // console.log(titleMatcher,contentRatingMatcher,genreMatcher);
    let list=await Videos.find({
        ...titleMatcher,
        ...contentRatingMatcher,
        ...genreMatcher
       
    });
    console.log("list",list.length);
   // console.log(list);
   // console.log(await Videos.find({}));
    if(sortBy)
    {
        let sortedList=sortVideosList(list,sortBy);
        return sortedList;
    }
   return list;
    
}

let getPossibleContentRating=(age)=>{
    let list=['Anyone', "7+", "12+", "16+", "18+"];
    if(age==="All")
    {
        return list;
    }
    
    let idx=list.indexOf(age);
    let ageAbleToWatchContent=list.splice(idx);
    return ageAbleToWatchContent;
}
let sortVideosList=(list,sortBy)=>{
    console.log(sortBy)
    list.sort((Video1,Video2)=>{
        let field1=Video1[sortBy];
        let field2=Video2[sortBy];
        //console.log(field1)
        if(sortBy=="releaseDate")
        {

            field1=new Date(field1).getTime()/1000;
            field2=new Date(field2).getTime()/1000;
            //console.log(field1);
        }
        if(field1>field2)
        {
            return -1;
        }
        return 1;
    });
   return list
}
let getById=async (id)=>{
    let obj=await Videos.findById(id);
    return obj;
}
let addVideo=async (obj)=>{
    let result=await Videos.create(obj);
    return result;
}
let updateViewCount=async (id)=>{
    const obj=await Videos.findById(id);
    console.log(obj);
    obj.viewCount +=1;
    await obj.save();
    return;
}
let updateVoteCount=async (id,body)=>{
    const obj=await Videos.findById(id);
    let {vote,change}=body;
    let voteChangeType="";
    if(vote=="upVote")
    {
        voteChangeType="upVotes";
    }
    else{
        voteChangeType="downVotes"
    }

    console.log(obj.votes[voteChangeType]);
    let preVoteNo=obj.votes[voteChangeType];
    let newVotes=preVoteNo;
    if(change=="increase")
    {
        newVotes+=1;
    }
    else{
        newVotes -=1;
    }

    newVotes=Math.max(newVotes,0);
    
    obj.votes[voteChangeType]=newVotes;
    await obj.save();
    return ;
}
module.exports={getAll,getById,addVideo,updateViewCount,updateVoteCount} 