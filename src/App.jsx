import React, { useEffect, useMemo, useState } from 'react'
import initialData from './data/initialData.json'

const STORAGE_KEY = 'dashboard_widgets_v1'

export default function App(){
  const [categories, setCategories] = useState(()=> {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : initialData
    }catch(e){
      return initialData
    }
  })
  const [query, setQuery] = useState('')
  const [form, setForm] = useState({name:'', text:'', categoryId:''})

  useEffect(()=> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
  },[categories])

  const allWidgets = useMemo(()=> {
    return categories.flatMap(cat => cat.widgets.map(w=>({...w, categoryName:cat.name, categoryId:cat.id})))
  },[categories])

  function addWidget(){
    if(!form.name || !form.text || !form.categoryId) return
    setCategories(prev => prev.map(cat => {
      if(cat.id === Number(form.categoryId)){
        const nextId = Date.now()
        return {...cat, widgets: [...cat.widgets, {id: nextId, name: form.name, text: form.text}]}
      }
      return cat
    }))
    setForm({name:'', text:'', categoryId:''})
  }

  function removeWidget(categoryId, widgetId){
    setCategories(prev => prev.map(cat => {
      if(cat.id === categoryId){
        return {...cat, widgets: cat.widgets.filter(w => w.id !== widgetId)}
      }
      return cat
    }))
  }

  function toggleCategoryInclusion(catId){
    // optional: implement an inclusion/exclusion toggle. For simplicity, we won't remove category; you can uncheck to hide via CSS
  }

  const filtered = useMemo(()=> {
    if(!query) return categories
    const q = query.toLowerCase()
    return categories.map(cat => ({
      ...cat,
      widgets: cat.widgets.filter(w => (w.name + ' ' + w.text).toLowerCase().includes(q))
    }))
  },[categories, query])

  return (
    <div className='app'>
      <header>
        <h1>Dashboard Widgets</h1>
        <div className='search'>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search widgets by name or text' />
        </div>
      </header>

      <section style={{marginBottom:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <select value={form.categoryId} onChange={e=>setForm({...form, categoryId:e.target.value})}>
            <option value=''>Select category to add widget</option>
            {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input placeholder='Widget name' value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input placeholder='Widget text' value={form.text} onChange={e=>setForm({...form, text:e.target.value})} />
          <button onClick={addWidget}>+ Add Widget</button>
        </div>
      </section>

      <main className='categories'>
        {filtered.map(cat => (
          <article className='category' key={cat.id}>
            <h3>{cat.name} ({cat.widgets.length})</h3>
            <div className='widgets'>
              {cat.widgets.length === 0 && <div style={{color:'#94a3b8', fontSize:13}}>No widgets</div>}
              {cat.widgets.map(w => (
                <div className='widget' key={w.id}>
                  <div>
                    <div style={{fontWeight:700}}>{w.name}</div>
                    <div className='meta'>{w.text}</div>
                  </div>
                  <div className='actions'>
                    <button onClick={()=>removeWidget(cat.id, w.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </main>
    </div>
  )
}
