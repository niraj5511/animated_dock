const dockWrap = document.getElementById('dockWrap');
const dockPanel = document.getElementById('dockPanel');
const icons = Array.from(dockPanel.querySelectorAll('.icon'));

let active = false;

dockWrap.addEventListener('mouseenter', () => {
  active = true;
  dockWrap.classList.add('active');
  icons.forEach((icon, i) => {
    icon.style.animationDelay = (i * 45) + 'ms';
  });
});

dockWrap.addEventListener('mouseleave', () => {
  active = false;
  dockWrap.classList.remove('active');
  icons.forEach(icon => {
    icon.style.transform = 'scale(1) translateY(0)';
    icon.classList.remove('hovered');
    icon.style.animation = 'none';
    void icon.offsetWidth;
    icon.style.animation = '';
  });
});

dockPanel.addEventListener('mousemove', (e) => {
  if (!active) return;
  const rect = dockPanel.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;

  let closestIcon = null;
  let closestDist = Infinity;

  icons.forEach(icon => {
    const iconRect = icon.getBoundingClientRect();
    const iconCenter = (iconRect.left - rect.left) + iconRect.width / 2;
    const dist = Math.abs(mouseX - iconCenter);

    const maxDist = 95;
    const maxScale = 1.65;
    const t = Math.max(0, 1 - dist / maxDist);
    const eased = t * t * (3 - 2 * t);
    const scale = 1 + (maxScale - 1) * eased;
    const lift = -12 * eased;

    icon.style.transform = `scale(${scale}) translateY(${lift}px)`;

    if (dist < closestDist) {
      closestDist = dist;
      closestIcon = icon;
    }
  });

  icons.forEach(icon => icon.classList.remove('hovered'));
  if (closestIcon && closestDist < 26) {
    closestIcon.classList.add('hovered');
  }
});