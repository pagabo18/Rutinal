const assert=require('node:assert/strict');
const {test}=require('node:test');
const core=require('../assets/web/coach/plan-core.js');
test('published versions preserve earlier plans',()=>{
 const draft=core.createDraft('workout','Torso',[{items:[{exercise:'press',sets:3}]}]);
 const v1=core.publish(draft,null,{id:'v1',publishedAt:'2026-10-14T12:00:00Z'});
 draft.days[0].items[0].sets=5;
 const v2=core.publish(draft,v1,{id:'v2',publishedAt:'2026-10-15T12:00:00Z'});
 assert.equal(v1.days[0].items[0].sets,3);
 assert.equal(v2.days[0].items[0].sets,5);
 assert.equal(v2.version,2);
 assert.deepEqual(core.assignment(v1,'athlete-1','2026-10-14T13:00:00Z').versionId,'v1');
});
test('invalid plans and assignments are rejected',()=>{
 assert.throws(()=>core.createDraft('medication','Drug',[]));
 assert.throws(()=>core.createDraft('nutrition','',[]));
 assert.throws(()=>core.assignment({status:'draft'},'a','2026-10-14'));
});
