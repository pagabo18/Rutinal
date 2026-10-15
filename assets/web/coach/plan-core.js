/* Rutinal coach domain: framework-free, offline-compatible plan versioning.
 * No network calls, credentials or health records in this module.
 * Include via <script src="coach/plan-core.js"></script> when UI integration is ready.
 */
(function(root){
  'use strict';
  const TYPES = Object.freeze(['workout','nutrition']);
  function assert(ok,message){if(!ok)throw new Error(message);}
  function clone(value){return JSON.parse(JSON.stringify(value));}
  function validatePlan(plan){
    assert(plan && typeof plan==='object' && !Array.isArray(plan),'Plan must be an object');
    assert(TYPES.includes(plan.type),'Unsupported plan type');
    assert(typeof plan.title==='string' && plan.title.trim().length>0,'Plan title required');
    assert(Array.isArray(plan.days),'Plan days must be an array');
    assert(plan.days.every(d=>d && typeof d==='object' && Array.isArray(d.items)),'Each day needs items');
    return true;
  }
  function createDraft(type,title,days){
    const draft={type,title,days:clone(days||[])};
    validatePlan(draft);
    return draft;
  }
  function publish(draft,previous,metadata){
    validatePlan(draft);
    if(previous){
      assert(previous.status==='published','Previous version must be published');
      assert(previous.type===draft.type,'Cannot change plan type between versions');
      assert(Number.isSafeInteger(previous.version) && previous.version>0,'Invalid previous version');
    }
    metadata=metadata||{};
    assert(typeof metadata.id==='string' && metadata.id.length>0,'Unique version id required');
    assert(typeof metadata.publishedAt==='string' && !Number.isNaN(Date.parse(metadata.publishedAt)),'Valid publish timestamp required');
    return Object.freeze({
      id:metadata.id,planId:previous?previous.planId:(metadata.planId||metadata.id),
      version:previous?previous.version+1:1,status:'published',
      type:draft.type,title:draft.title.trim(),days:clone(draft.days),
      publishedAt:metadata.publishedAt
    });
  }
  function assignment(plan,athleteId,assignedAt){
    assert(plan && plan.status==='published','Only published plans can be assigned');
    assert(typeof athleteId==='string' && athleteId.length>0,'Athlete id required');
    assert(typeof assignedAt==='string' && !Number.isNaN(Date.parse(assignedAt)),'Assignment timestamp required');
    return {athleteId,planId:plan.planId,versionId:plan.id,version:plan.version,assignedAt};
  }
  const api=Object.freeze({validatePlan,createDraft,publish,assignment});
  if(typeof module==='object' && module.exports)module.exports=api;
  else root.RutinalPlanCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
