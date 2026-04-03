import { Link } from 'react-router-dom';
import React from 'react';
import Logo from '../Logo';


export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/95 py-5 shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 text-sm text-slate-600">
        <Logo width="170px" />
        <p className="text-slate-500">Simple blog publishing for testing and demos.</p>
      </div>
    </footer>
  );
}
