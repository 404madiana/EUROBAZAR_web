import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Help() {
  const [notices, setNotices] = useState([])
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [content, setContent] = useState('')

  // Charger la liste des notices
  useEffect(() => {
    const loadNotices = async () => {
      try {
        const modules = import.meta.glob('../notices/*.md', { query: '?raw', import: 'default' })
        const noticesList = Object.keys(modules).map(path => {
          const filename = path.split('/').pop().replace('.md', '')
          return {
            id: filename,
            label: filename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            path: path
          }
        })
        setNotices(noticesList)
        if (noticesList.length > 0) {
          setSelectedNotice(noticesList[0].id)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des notices:', error)
      }
    }
    loadNotices()
  }, [])

  // Charger le contenu du fichier sélectionné
  useEffect(() => {
    if (selectedNotice) {
      const loadContent = async () => {
        try {
          const modules = import.meta.glob('../notices/*.md', { query: '?raw', import: 'default' })
          const notice = notices.find(n => n.id === selectedNotice)
          if (notice) {
            const module = await modules[notice.path]()
            setContent(module)
          }
        } catch (error) {
          console.error('Erreur lors du chargement du contenu:', error)
        }
      }
      loadContent()
    }
  }, [selectedNotice, notices])

  return (
    <section className="page-content">
      <header className="page-header">
        <p className="eyebrow"></p>
        <h1>Centre d'aide</h1>
        <div className="paragraphe contact-store-hours">
          <p>
            Cette page regroupe toutes questions et remarques
            fréquentes à propos de nos magasins.<br/>
            Si vous ne trouvez pas ce que vous voulez ou qu'il y a un problème sur le site, contactez-nous !
          </p>
          <div className="desktop-links panneau">
            <Link to="/contact">Contactez-nous !</Link>
          </div>
        </div>
      </header>

      <div className="help-grid">
        <aside className="help-sidebar">
          <nav className="help-nav">
            {notices.map(notice => (
              <button
                key={notice.id}
                className={`help-nav-item ${selectedNotice === notice.id ? 'active' : ''}`}
                onClick={() => setSelectedNotice(notice.id)}
              >
                {notice.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="help-content">
          {content && <ReactMarkdown>{content}</ReactMarkdown>}
        </main>
      </div>
    </section>
  )
}