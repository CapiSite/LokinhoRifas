import { useSidebarState } from "../contexts/SidebarContext";

const Sidebar = () => {
  const { sidebarView } = useSidebarState() as { sidebarView:boolean }

  return (
    <section className={sidebarView ? "Sidebar mobile tablet visible" : "Sidebar mobile tablet"}>
      <div className="SidebarWrapper">
        <ul className="MainNavigation">
          <li>Home</li>
          <li>Vantagens</li>
          <li>Grupos</li>
          <li>Sobre Nós</li>
        </ul>
        <button>Faça parte!</button>
        <ul className="Socials">
          <li>Whatsapp</li>
          <li>Instagram</li>
        </ul>
      </div>
    </section>
  );
}
 
export default Sidebar;